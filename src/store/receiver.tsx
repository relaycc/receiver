import create from 'zustand'
import { Client, Conversation, Message } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';
import { getAddress } from '@ethersproject/address'
import { initialize } from './xmtp-react/context/initialize';
import { useImmer } from 'use-immer';
import { GroupMessage } from './xmtp-react/groups';

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

  setPeerAddress: (address: string) => void,
  setPeerName: (name: string) => void,
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

  setPeerAddress: (address) => {
    if (get().peerAddress !== address) {
      set({ peerAddress: address });
    }
  },

  setPeerName: (name) => set(() => ({ peerName: name })),

  xmtpInit: (wallet) => {
    initializeXmtp(wallet);
  }
}))

const initializeXmtp = async(wallet: Signer) => {
  await initialize(
    wallet,
    handleClientWaitingForSignature,
    handleClientConnect,
    handleClientError,
    handleNewConversation,
    handleConversationsLoaded,
    handleNewMessage,
    handleNewGroupMessage,
    handleMessagesLoaded
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

const handleClientConnect = (client: Client) => {
  receiverStore.setState({client: client});
  receiverStore.setState({xmtpStatus: Status.loading});
};

const handleClientError = (error: unknown) => {
  receiverStore.setState({client: null});
  receiverStore.setState({xmtpStatus: Status.error});
};

const handleConversationsLoaded = () => {
  // Do we need to do anything here?
};

const handleNewConversation = (conversation: Conversation) => {  
  const { conversations } = receiverStore();
  conversations[conversation.peerAddress] = conversation;

  receiverStore.setState({conversations: conversations});
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
    // TODO You need to incorporate activity into group messages also.
    const { activity: prevActivity, messages: prevMessages } = receiverStore();
    
    if (prevActivity[peerAddress] === undefined) {
      prevActivity[peerAddress] = sent;
    } else {
      if (prevActivity[peerAddress].getTime() < sent.getTime()) {
        prevActivity[peerAddress] = sent;
      }
    }

    prevMessages[peerAddress] = prevMessages[peerAddress] || {};
    prevMessages[peerAddress][message.id] = message;
    
    receiverStore.setState({ activity: prevActivity, messages: prevMessages });
  }
}

const handleNewGroupMessage = (message: GroupMessage) => {
  const { groupMessages: prevGroupMessages } = receiverStore();

  prevGroupMessages[message.content.groupId] = prevGroupMessages[message.content.groupId] || {};
  prevGroupMessages[message.content.groupId][message.content.groupMessageId] = message;
  
  receiverStore.setState({ groupMessages: prevGroupMessages });
};
