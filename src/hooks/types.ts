export type Setter<T> = (state: T) => unknown;
import { Signer } from '@ethersproject/abstract-signer';
import { Client, Stream } from '@relaycc/xmtp-js';

export type ReceiverScreen =
  | { id: 'messages'; peerAddress: string }
  | { id: 'conversations' }
  | { id: 'pinned' }
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
  | 'no peer'
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

export type Listener = (message: Message) => unknown;

export interface Relay {
  client: Client | null;
  setClient: (client: Client | null) => unknown;
  signatureStatus: SignatureStatus;
  setSignatureStatus: Setter<SignatureStatus>;
  stream: Stream<Message> | null;
  setStream: Setter<Stream<Message> | null>;
  listeners: Listener[];
  setListeners: Setter<Listener[]>;
  dispatch: (action: RelayAction) => unknown;
}

export interface NoOpAddress {
  address: undefined;
  status: 'noop';
}

export interface FetchingAddress {
  address: undefined;
  status: 'fetching';
}

export interface ErrorAddress {
  address: undefined;
  status: 'error';
}

export interface SettledAddress {
  address: string | undefined;
  status: 'settled';
}

export type Address =
  | NoOpAddress
  | FetchingAddress
  | ErrorAddress
  | SettledAddress;

export interface NoOpName {
  name: undefined;
  status: 'noop';
}

export interface FetchingName {
  name: undefined;
  status: 'fetching';
}

export interface ErrorName {
  name: undefined;
  status: 'error';
}

export interface SettledName {
  name: string | undefined;
  status: 'settled';
}

export type EnsName = NoOpName | FetchingName | ErrorName | SettledName;

export interface NoOpAvatar {
  avatar: undefined;
  status: 'noop';
}

export interface FetchingAvatar {
  avatar: undefined;
  status: 'fetching';
}

export interface ErrorAvatar {
  avatar: undefined;
  status: 'error';
}

export interface SettledAvatar {
  avatar: string | undefined;
  status: 'settled';
}

export type EnsAvatar =
  | NoOpAvatar
  | FetchingAvatar
  | ErrorAvatar
  | SettledAvatar;

export const isEthAddress = (handle?: string | null): handle is string => {
  return (
    typeof handle === 'string' &&
    handle.startsWith('0x') &&
    handle.length === 42
  );
};

export const isEnsName = (handle?: string | null): handle is string => {
  return typeof handle === 'string' && handle.endsWith('.eth');
};

export const isLensName = (handle?: string | null): handle is string => {
  return (
    typeof handle === 'string' &&
    handle.endsWith('.lens') &&
    handle.length > 9 &&
    handle.length < 37
  );
};

export interface LensProfilesQueryResponse {
  profiles: {
    items: LensProfile[];
  };
}

export interface NoOpLensProfiles {
  profiles: undefined;
  status: 'noop';
}

export interface FetchingLensProfiles {
  profiles: undefined;
  status: 'fetching';
}

export interface ErrorLensProfiles {
  profiles: undefined;
  status: 'error';
}

// TODO(achilles@relay.cc) We really should use a typed graphql client.
export interface SettledLensProfiles {
  profiles: LensProfilesQueryResponse | undefined;
  status: 'settled';
}

export interface LensProfile {
  name: string;
  bio: string;
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    totalPosts: number;
    totalComments: number;
    totalMirrors: number;
    totalPublications: number;
    totalCollects: number;
  };
  handle: string;
  ownedBy: string;
  isDefault: boolean;
  picture: {
    // NftImage: {
    uri: string;
    // };
    // MediaSet: {
    original: {
      url: string;
    };
    // };
  };
}

export type LensProfiles =
  | NoOpLensProfiles
  | FetchingLensProfiles
  | ErrorLensProfiles
  | SettledLensProfiles;

export interface NoOpEthBalance {
  balance: undefined;
  status: 'noop';
}

export interface FetchingEthBalance {
  balance: undefined;
  status: 'fetching';
}

export interface ErrorEthBalance {
  balance: undefined;
  status: 'error';
}

export interface SettledEthBalance {
  balance: string;
  status: 'settled';
}

export type EthBalance =
  | NoOpEthBalance
  | FetchingEthBalance
  | ErrorEthBalance
  | SettledEthBalance;

export interface NoOpTransactionCount {
  count: undefined;
  status: 'noop';
}

export interface FetchingTransactionCount {
  count: undefined;
  status: 'fetching';
}

export interface ErrorTransactionCount {
  count: undefined;
  status: 'error';
}

export interface SettledTransactionCount {
  count: number;
  status: 'settled';
}

export type TransactionCount =
  | NoOpTransactionCount
  | FetchingTransactionCount
  | ErrorTransactionCount
  | SettledTransactionCount;

export interface OwnedNFTsResponse {
  ownedNfts: {
    contract: {
      address: string;
    };
    id: {
      tokenId: string;
      tokenMetadata: {
        tokenType: string;
      };
    };
    media: {
      gateway: string;
    }[];
    metadata: {
      name: string;
    };
    title: string;
    timeLastUpdated: string;
  }[];
}

export interface NoOpOwnedNfts {
  ownedNfts: undefined;
  status: 'noop';
}

export interface FetchingOwnedNfts {
  ownedNfts: undefined;
  status: 'fetching';
}

export interface ErrorOwnedNfts {
  ownedNfts: undefined;
  status: 'error';
}

export interface SettledOwnedNfts {
  ownedNfts: OwnedNFTsResponse | undefined;
  status: 'settled';
}

export type OwnedNfts =
  | NoOpOwnedNfts
  | FetchingOwnedNfts
  | ErrorOwnedNfts
  | SettledOwnedNfts;
