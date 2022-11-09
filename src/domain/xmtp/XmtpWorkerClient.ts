import { XmtpWorker } from './XmtpWorker';
import { wrap, Remote, proxy } from 'comlink';
import { XmtpClient } from './XmtpClient';
import {
  ContentType,
  ListMessagesOptions,
  SendOptions,
  Message,
  Wallet,
  ClientOptions,
} from './mapping';
import { EthAddress } from '../eth';

type XmtpWorkerClass = XmtpWorker & {
  new (): XmtpWorker;
};

export class XmtpWorkerClient implements XmtpClient {
  private worker: Worker;
  private client: Promise<Remote<XmtpWorker>>;

  public constructor(worker: Worker) {
    this.worker = worker;
    this.client = (async () => {
      const MyWorkerClass = wrap<XmtpWorkerClass>(this.worker);
      return new MyWorkerClass();
    })();
  }

  public async startClient(wallet: Wallet, opts?: Partial<ClientOptions>) {
    const client = await this.client;
    return client.startClient(proxy(wallet), opts);
  }

  public async fetchClient(clientAddress: EthAddress) {
    const client = await this.client;
    return client.fetchClient(clientAddress);
  }

  public async fetchMessages(
    clientAddress: EthAddress,
    peerAddress: EthAddress,
    opts?: Partial<ListMessagesOptions>
  ) {
    const client = await this.client;
    return client.fetchMessages(clientAddress, peerAddress, opts);
  }

  public async fetchConversations(clientAddress: EthAddress) {
    const client = await this.client;
    return client.fetchConversations(clientAddress);
  }

  public async fetchPeerOnNetwork(
    clientAddress: EthAddress,
    peerAddress: EthAddress
  ) {
    const client = await this.client;
    return client.fetchPeerOnNetwork(clientAddress, peerAddress);
  }

  public async sendMessage(
    clientAddress: EthAddress,
    peerAddress: EthAddress,
    content: ContentType,
    opts?: Partial<SendOptions>
  ) {
    const client = await this.client;
    return client.sendMessage(clientAddress, peerAddress, content, opts);
  }

  public async listenToAllMessagesStream(
    clientAddress: EthAddress,
    handler: (message: Message) => unknown
  ) {
    const client = await this.client;
    const streamId = await client.listenToAllMessagesStream(
      clientAddress,
      proxy(handler)
    );
    return { unlisten: () => client.returnStream(streamId) };
  }

  public async listenToConversationStream(
    clientAddress: EthAddress,
    peerAddress: EthAddress,
    handler: (message: Message) => unknown
  ) {
    const client = await this.client;
    const streamId = await client.listenToConversationStream(
      clientAddress,
      peerAddress,
      proxy(handler)
    );
    return { unlisten: () => client.returnStream(streamId) };
  }

  public async createIdentity() {
    const client = await this.client;
    return client.createIdentity();
  }
}
