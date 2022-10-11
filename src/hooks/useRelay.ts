import { useEffect } from 'react';
import { Signer } from '@ethersproject/abstract-signer';
import { Client, Stream } from '@relaycc/xmtp-js';
import create from 'zustand';
import { RelayAction, Relay, Message, Channel } from './types';

let stream: Stream<Message> | null = null;

export const useRelay = create<Relay>((set, get) => ({
  client: null,
  stream: null,
  setClient: (client) => set({ client }),
  signatureStatus: 'idle',
  setSignatureStatus: (signatureStatus) => set({ signatureStatus }),
  setStream: (stream) => set({ stream }),
  listeners: [],
  setListeners: (listeners) => set({ listeners }),
  dispatch: (action: RelayAction) => {
    switch (action.id) {
      case 'sign in':
        handleSignIn(get(), action.wallet);
        break;
      default:
        console.log(action.id);
      // throw new Error('Never should have got here!');
    }
  },
}));

export const useMessageStream = (handler: (message: Message) => unknown) => {
  const client = useRelay((state) => state.client);
  const setStream = useRelay((state) => state.setStream);
  const stream = useRelay((state) => state.stream);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (client !== null && stream === null) {
        const id = 'Timer for streamAllMessages' + String(Math.random());
        console.time(id);
        const stream =
          (await client.conversations.streamAllMessages()) as unknown as Stream<Message>;
        console.timeEnd(id);
        setStream(stream);
      }
    };

    init();
  }, [client]);

  useEffect(() => {
    const listen = async () => {
      if (stream === null || isListening) {
        return;
      } else {
        setIsListening(true);
        for await (const message of stream) {
          handler(message);
        }
      }
    };
    useInterval(listen, 1000);
  }, []);
};

const handleSignIn = async (state: Relay, wallet: Signer) => {
  try {
    state.setSignatureStatus('waiting');
    const client = await Client.create(wallet, { env: 'production' });
    state.setClient(client);
    state.setSignatureStatus('idle');
  } catch (err) {
    console.error('Error during XMTP signing', err);
    state.setSignatureStatus('denied');
  }
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

export const messageListToChannel = (
  client: Client,
  messages: Message[]
): Channel => {
  return messages.reduce((result, message) => {
    return {
      ...result,
      [pickPeerAddress(client.address, message)]: message,
    };
  }, {});
};
