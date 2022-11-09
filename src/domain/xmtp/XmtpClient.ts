import { EthAddress } from '../eth';
import {
  ContentType,
  IdentityWallet,
  ListMessagesOptions,
  SendOptions,
  Message,
  Conversation,
  Wallet,
  Client,
  ClientOptions,
} from './mapping';

export interface XmtpClient {
  createIdentity: () => Promise<IdentityWallet>;
  startClient: (
    wallet: Wallet,
    opts?: Partial<ClientOptions>
  ) => Promise<Client | null>;
  fetchClient: (clientAddress: EthAddress) => Promise<Client | null>;
  fetchMessages: (
    clientAddress: EthAddress,
    peerAddress: EthAddress,
    opts?: Partial<ListMessagesOptions>
  ) => Promise<Message[]>;
  fetchConversations: (clientAddress: EthAddress) => Promise<Conversation[]>;
  fetchPeerOnNetwork: (
    clientAddress: EthAddress,
    peerAddress: EthAddress
  ) => Promise<boolean>;
  sendMessage: (
    clientAddress: EthAddress,
    peerAddress: EthAddress,
    content: ContentType,
    opts?: Partial<SendOptions>
  ) => Promise<Message>;
  listenToAllMessagesStream: (
    clientAddress: EthAddress,
    handler: (message: Message) => unknown
  ) => Promise<{
    unlisten: () => void;
  }>;
  listenToConversationStream: (
    clientAddress: EthAddress,
    peerAddress: EthAddress,
    handler: (message: Message) => unknown
  ) => Promise<{ unlisten: () => void }>;
}
