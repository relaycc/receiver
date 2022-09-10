import { Signer } from '@ethersproject/abstract-signer';
import { Client, Message as XmtpMessage, Stream } from '@relaycc/xmtp-js';
import { messageApi } from '@xmtp/proto';
import create from 'zustand';
import { RelayAction, Relay, Message, Channel } from './types';

export const useRelay = create<Relay>((set, get) => ({
  client: null,
  stream: null,
  channels: {},
  statuses: {},
  setClient: (client) => set({ client }),
  signatureStatus: 'idle',
  setSignatureStatus: (signatureStatus) => set({ signatureStatus }),
  setChannels: (channels) => set({ channels }),
  setStatuses: (statuses) => set({ statuses }),
  setStream: (stream) => set({ stream }),
  dispatch: (action: RelayAction) => {
    switch (action.id) {
      case 'sign in':
        handleSignIn(get(), action.wallet);
        break;
      case 'load peer address':
        handleLoadPeerAddress(get(), action.peerAddress);
        break;
      case 'load conversation list':
        handleLoadConversationList(get(), action.options);
        break;
      case 'stream messages':
        handleStreamMessages(get());
        break;
      case 'new message':
        handleNewMessage(get(), action.message);
        break;
      default:
        throw new Error('Never should have got here!');
    }
  },
}));

const handleStreamMessages = async (state: Relay) => {
  if (state.client === null || state.stream !== null) {
    return;
  } else {
    // TODO(achilles@relay.cc) Type this correctly!
    const stream =
      (await state.client.conversations.streamAllMessages()) as unknown as Stream<Message>;
    state.setStream(stream);
    listenToStream(state, stream);
  }
};

const listenToStream = async (state: Relay, stream: Stream<Message>) => {
  for await (const message of stream) {
    state.dispatch({ id: 'new message', message });
  }
};

const handleNewMessage = async (state: Relay, message: Message) => {
  if (state.client === null) {
    return;
  } else {
    const peerAddress = pickPeerAddress(state.client.address, message);
    state.setChannels({
      ...state.channels,
      [peerAddress]: {
        ...(state.channels[peerAddress] || {}),
        [message.id]: message,
      },
      conversationList: {
        ...(state.channels.conversationList || {}),
        [peerAddress]: message,
      },
    });
  }
};

const handleSignIn = async (state: Relay, wallet: Signer) => {
  try {
    state.setSignatureStatus('waiting');
    const client = await Client.create(wallet, { env: 'production' });
    state.setClient(client);
    state.setSignatureStatus('idle');
  } catch {
    state.setSignatureStatus('denied');
  }
};

const handleLoadPeerAddress = async (
  state: Relay,
  peerAddress: string,
  limit = 20
) => {
  if (state.client === null) {
    return;
  } else {
    if (state.statuses[peerAddress] !== undefined) {
      return;
    } else {
      const messages = await fetchMessages(state.client, peerAddress, limit);
      state.setStatuses({
        ...state.statuses,
        [peerAddress]: 'loadingFull',
      });
      state.setChannels({
        ...state.channels,
        [peerAddress]: messages.reduce((result, message) => {
          return { ...result, [message.id]: message };
        }, {}),
      });
      state.setStatuses({
        ...state.statuses,
        [peerAddress]: 'loadedFull',
      });
    }
  }
};

const handleLoadConversationList = async (
  state: Relay,
  options?: {
    limitPeerAddresses?: string[];
    forceReload?: boolean;
  }
) => {
  const client = state.client;
  if (client === null) {
    return;
  } else {
    if (
      // If we've already loaded the conversation list, don't do it again.
      state.statuses.conversationList !== undefined &&
      Boolean(options?.forceReload) === false
    ) {
      return;
    } else {
      state.setStatuses({
        ...state.statuses,
        conversationsList: 'loadingFull',
      });
      const messages = await fetchConversationList(
        client,
        options?.limitPeerAddresses
      );
      state.setChannels({
        ...state.channels,
        conversationList: messages.reduce((result, message) => {
          return {
            ...result,
            [pickPeerAddress(client.address, message)]: message,
          };
        }, {}),
      });
      state.setStatuses({
        ...state.statuses,
        conversationList: 'loadedFull',
      });
    }
  }
};

const fetchConversationList = async (
  client: Client,
  limitPeerAddresses?: string[]
): Promise<Message[]> => {
  let peerAddresses: string[];
  if (limitPeerAddresses === undefined) {
    peerAddresses = await client.conversations
      .list()
      .then((conversations) =>
        conversations.map((conversation) => conversation.peerAddress)
      );
  } else {
    peerAddresses = limitPeerAddresses;
  }
  const lists = await Promise.all(
    peerAddresses.map((peerAddress) => {
      return fetchMessages(client, peerAddress, 1);
    })
  );
  return lists.map((list) => list[0]);
};

const fetchMessages = async (
  client: Client,
  peerAddress: string,
  limit = 1,
  direction = messageApi.SortDirection.SORT_DIRECTION_DESCENDING
) => {
  const notValidatedMessages = await client.listConversationMessages(
    peerAddress,
    { limit, direction }
  );
  const messages: Message[] = [];
  for (const notValidated of notValidatedMessages) {
    if (validateMessage(notValidated)) {
      messages.push(notValidated);
    }
  }
  return messages;
};

export const validateMessage = (
  xmtpMessage: unknown
): xmtpMessage is Message => {
  const test = xmtpMessage as XmtpMessage;
  return (
    test.sent !== undefined &&
    test.recipientAddress !== undefined &&
    test.senderAddress !== undefined
  );
};

export const byMostRecentMessage = (channel: Channel): Message[] => {
  return Object.values(channel).sort((a, b) => {
    return a.sent.getTime() <= b.sent.getTime() ? -1 : 1;
  });
};

export const pickPeerAddress = (
  clientAddress: string,
  message: Message
): string => {
  if (clientAddress === message.recipientAddress) {
    return message.senderAddress;
  } else {
    return message.recipientAddress;
  }
};

export const isEmpty = (channel: Channel) => {
  return Object.values(channel).length === 0;
};
