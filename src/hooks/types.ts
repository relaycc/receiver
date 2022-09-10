export type Setter<T> = (state: T) => unknown;
import { Signer } from '@ethersproject/abstract-signer';
import { Client, Stream } from '@relaycc/xmtp-js';

export type ReceiverScreen =
  | { id: 'messages'; peerAddress: string }
  | { id: 'conversations' }
  | { id: 'new conversation' };

export type ReceiverAction =
  | {
      id: 'add pinned conversation';
      peerAddress: string;
    }
  | {
      id: 'remove pinned conversation';
      peerAddress: string;
    }
  | {
      id: 'go to screen';
      screen: ReceiverScreen;
    }
  | {
      id: 'go back screen';
    };

export interface ReceiverStore {
  wallet: Signer | null;
  setWallet: Setter<Signer | null>;
  pinnedConversations: string[];
  setPinnedConversations: Setter<string[]>;
  isOpen: boolean;
  setIsOpen: Setter<boolean>;
  screenHistory: ReceiverScreen[];
  setScreenHistory: Setter<ReceiverScreen[]>;
  dispatch: (action: ReceiverAction) => unknown;
}

export interface Message {
  id: string;
  sent: Date;
  recipientAddress: string;
  senderAddress: string;
  /* eslint-disable-next-line */
  content: any;
}

export type SignatureStatus = 'idle' | 'waiting' | 'denied';
export type Channel = Record<string, Message>;
export type ChannelStore = Record<string, Channel | undefined>;
export type ChannelStatus =
  | undefined
  | 'loadingFull'
  | 'loadedFull'
  | 'streaming';
export type ChannelStatusStore = Record<string, ChannelStatus | undefined>;
export type RelayAction =
  | {
      id: 'load peer address';
      peerAddress: string;
    }
  | {
      id: 'load conversation list';
      options?: {
        limitPeerAddresses?: string[];
        forceReload?: boolean;
      };
    }
  | {
      id: 'sign in';
      wallet: Signer;
    }
  | {
      id: 'stream messages';
    }
  | {
      id: 'new message';
      message: Message;
    };

export interface Relay {
  client: Client | null;
  setClient: (client: Client | null) => unknown;
  signatureStatus: SignatureStatus;
  setSignatureStatus: Setter<SignatureStatus>;
  channels: ChannelStore;
  setChannels: Setter<ChannelStore>;
  statuses: ChannelStatusStore;
  setStatuses: Setter<ChannelStatusStore>;
  stream: Stream<Message> | null;
  setStream: Setter<Stream<Message> | null>;
  dispatch: (action: RelayAction) => unknown;
}
