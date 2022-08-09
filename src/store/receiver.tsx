import create from 'zustand'
import { Client, Conversation, Message } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';
import { getAddress } from '@ethersproject/address'
import { initialize } from '../xmtp-react/initialize';
import { useImmer } from 'use-immer';
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
      const { data: ensName } = useEnsName({
        address: address,
      })

      set({ peerAddress: address, peerName: ensName });
    }
  },

  setPeerName: (name) => set(() => ({ peerName: name })),

  xmtpInit: (wallet) => {
    initializeXmtp(wallet, get().peerAddress);
  }
}))

const initializeXmtp = async(wallet: Signer, peerAddress: string | null) => {
  await initialize(
    wallet,
    peerAddress,
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
