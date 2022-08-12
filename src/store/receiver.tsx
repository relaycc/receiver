import create from 'zustand'
import { Client, Conversation, Message } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';
import { initialize } from '../xmtp-react/initialize';
import { initializeMessages } from '../xmtp-react/messages/initialize';

import { GroupMessage } from '../xmtp-react/groups';
import { useEnsName  } from 'wagmi';

enum Status {
  disconnected = 'no signer available',
  idle = 'idle',
  waiting = 'waiting on signature',
  denied = 'signature denied',
  loading = 'loading messages',
  ready = 'ready',
  error = 'error',
}

interface ReceiverState {
  activity: Record<string, Date>,
  client: Client | null,
  conversations: Record<string, Conversation>,
  groupMessages: Record<string, Record<string, GroupMessage>>,
  messages: Record<string, Record<string, Message>>,
  peerAddress: string | null,
  peerName: string | null,
  xmtpStatus: Status,
  wallet: Signer | null,
  setPeerAddress: (address: string, name: string | null) => void,
  setXmtpConnected: (wallet: Signer) => void,
  xmtpInit: (wallet: Signer) => void,
}

export const receiverStore = create<ReceiverState>((set, get) => ({
  activity: {}, 
  client: null,
  conversations: {},
  groupMessages: {},
  messages: {},
  peerAddress: null,
  peerName: null,
  xmtpStatus: Status.disconnected,
  wallet: null,

  setXmtpConnected: async (wallet: Signer) => {
    set({ wallet: wallet })

    // initialize xmtp 
    if (get().peerAddress && wallet) {
      await initializeXmtp(wallet);

      const client = get().client;
      const address = get().peerAddress;
      if (address && client) {
        initializeMessages(
          client, 
          address, 
          handleNewConversation,
          handleConversationsLoaded,
          handleNewMessage,
          handleNewGroupMessage,
          handleMessagesLoaded
        );
      }
    }
  },

  setPeerAddress: (address, name) => {
    if (get().peerAddress !== address) {  
      const client = get().client;

      if (client) {
       if (!get().conversations[address]) {
        set({xmtpStatus: Status.loading});

          initializeMessages(
            client, 
            address, 
            handleNewConversation,
            handleConversationsLoaded,
            handleNewMessage,
            handleNewGroupMessage,
            handleMessagesLoaded
          );
        }
      }

      set({ peerAddress: address, peerName: name ? name : null});
    }
  },

  xmtpInit: (wallet) => {
    initializeXmtp(wallet);
  },
}))

const initializeXmtp = async(wallet: Signer) => {
  await initialize(
    wallet,
    handleClientWaitingForSignature,
    handleClientConnect,
    handleClientError
  );
}

const handleWalletDisconnect = () => {
  receiverStore.setState({client: null});
  receiverStore.setState({xmtpStatus: Status.disconnected});
};

const handleNewWalletConnect = () => {
  receiverStore.setState({client: null});
  receiverStore.setState({xmtpStatus: Status.idle});
};

const handleClientWaitingForSignature = () => {
  receiverStore.setState({xmtpStatus: Status.waiting});
};

const handleClientConnect = async (client: Client) => {
  const { peerAddress } = receiverStore.getState();
 
  receiverStore.setState({client: client, xmtpStatus: Status.loading});
};

const handleClientError = (error: unknown) => {
  receiverStore.setState({client: null, xmtpStatus: Status.error});
};

const handleConversationsLoaded = () => {
  // Do we need to do anything here?
};

const handleNewConversation = (conversation: Conversation) => {  
  receiverStore.setState((prev) => {
    prev.conversations[conversation.peerAddress] = conversation;
    return { conversations: prev.conversations }
  })
};

const handleMessagesLoaded = () => {
  receiverStore.setState({xmtpStatus: Status.ready});
};

const handleNewMessage = (conversation: Conversation, message: Message) => {
  const { sent } = message;
  const { peerAddress } = conversation;
  if (sent === undefined) {
    return;
  } else {
    receiverStore.setState((prev) => {
      prev.messages[peerAddress] = prev.messages[peerAddress] || {};
      prev.messages[peerAddress][message.id] = message;
      return { messages: prev.messages }
    })
  }
}

const handleNewGroupMessage = (message: GroupMessage) => {
  receiverStore.setState((prev) => {
    prev.groupMessages[message.content.groupId] = prev.groupMessages[message.content.groupId] || {};
    prev.groupMessages[message.content.groupId][message.content.groupMessageId] = message;
    return { groupMessages: prev.groupMessages }
  })
};