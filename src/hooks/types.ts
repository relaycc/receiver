export type Setter<T> = (state: T) => unknown;

export type XmtpNetwork = 'dev' | 'production';

export interface ClientOptions {
  env: XmtpNetwork;
}

export interface SignerWallet {
  id: 'signer wallet';
  wallet: {
    getAddress: () => Promise<string>;
    signMessage: (message: string) => Promise<string>;
  };
}

export interface IdentityWallet {
  id: 'identity wallet';
  wallet: {
    address: string;
    privateKey: string;
  };
}

export type WorkerWallet = SignerWallet | IdentityWallet;

export interface ListMessagesOptions {
  limit?: number;
  direction?: 'ascending' | 'descending';
}

export interface Client {
  address: string;
}

export interface Message {
  id: string;
  sent: Date;
  recipientAddress: string;
  senderAddress: string;
  /* eslint-disable-next-line */
  content: any;
}

export interface Conversation {
  peerAddress: string;
}

export interface Group {
  wallet: IdentityWallet;
  name?: string;
  description?: string;
}

export interface CreateGroupOptions {
  name: string;
  description: string;
}

export interface XmtpApi {
  createIdentity: () => Promise<IdentityWallet>;
  startClient: (
    wallet: WorkerWallet,
    opts?: Partial<ClientOptions>
  ) => Promise<Client | null>;
  fetchClient: (clientAddress: string) => Promise<Client | null>;
  fetchMessages: (
    clientAddress: string,
    peerAddress: string,
    opts: Partial<ListMessagesOptions>
  ) => Promise<Message[]>;
  fetchConversations: (clientAddress: string) => Promise<Conversation[]>;
  fetchPeerOnNetwork: (
    clientAddress: string,
    peerAddress: string
  ) => Promise<boolean>;
  sendMessage: (
    clientAddress: string,
    peerAddress: string,
    message: string
  ) => Promise<Message>;
  listenToAllMessagesStream: (
    clientAddress: string,
    handler: (message: Message) => unknown
  ) => Promise<{
    unlisten: () => void;
  }>;
  listenToConversationStream: (
    clientAddress: string,
    peerAddress: string,
    handler: (message: Message) => unknown
  ) => Promise<{ unlisten: () => void }>;
}

export type ReceiverScreen =
  | { id: 'messages'; handle: string }
  | { id: 'group'; handle: string }
  | { id: 'no project'; handle: string }
  | { id: 'all conversations' }
  | { id: 'pinned conversations' }
  | { id: 'ignored conversations' }
  | { id: 'groups' }
  | { id: 'menu' }
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
  wallet: WorkerWallet | null;
  setWallet: Setter<WorkerWallet | null>;
  pinnedConversations: string[];
  setPinnedConversations: Setter<string[]>;
  isOpen: boolean;
  setIsOpen: Setter<boolean>;
  screenHistory: ReceiverScreen[];
  setScreenHistory: Setter<ReceiverScreen[]>;
  dispatch: (action: ReceiverAction) => unknown;
}

export type SignatureStatus = 'idle' | 'waiting' | 'denied';

export type Listener = (message: Message) => unknown;

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

export const isEthAddress = (handle?: string | null): handle is string => {
  return (
    typeof handle === 'string' &&
    handle.startsWith('0x') &&
    handle.length === 42
  );
};

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
