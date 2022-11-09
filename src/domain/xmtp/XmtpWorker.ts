import { Client as Xmtp } from '@xmtp/xmtp-js';
import { Wallet as EthersWallet } from '@ethersproject/wallet';
import { Signer } from '@ethersproject/abstract-signer';
import * as Comlink from 'comlink';
import {
  GroupInviteCodec,
  GroupCodec,
  GroupsCodec,
  IgnoredAddressesCodec,
  PinnedAddressesCodec,
  GroupMessageCodec,
} from './codecs';
import {
  IdentityWallet,
  Wallet,
  Message,
  ClientOptions,
  ListMessagesOptions,
  SendOptions,
  ContentType,
  fromXmtpMessage,
  fromXmtpClient,
  fromXmtpConversation,
  toXmtpSendOptions,
} from './mapping';
import { isEthAddress } from '../eth';

const CODECS = [
  new GroupInviteCodec(),
  new GroupCodec(),
  new GroupsCodec(),
  new IgnoredAddressesCodec(),
  new PinnedAddressesCodec(),
  new GroupMessageCodec(),
];

export class XmtpWorker {
  public clients: Record<string, Xmtp | undefined> = {};
  public streams: Record<string, { return: () => unknown }> = {};

  public async createIdentity(): Promise<IdentityWallet> {
    const wallet = EthersWallet.createRandom();
    await Xmtp.create(wallet, {
      env: 'dev',
      codecs: CODECS,
    });
    await Xmtp.create(wallet, {
      env: 'production',
      codecs: CODECS,
    });
    return {
      id: 'identity wallet',
      wallet: {
        address: (() => {
          if (!isEthAddress(wallet.address)) {
            throw new Error('Invalid address!');
          } else {
            return wallet.address;
          }
        })(),
        uuid: wallet.privateKey,
      },
    };
  }

  public async startClient(wallet: Wallet, opts?: Partial<ClientOptions>) {
    const address = await (async () => {
      if (wallet.id === 'identity wallet') {
        return wallet.wallet.address;
      } else {
        return wallet.wallet.getAddress();
      }
    })();

    const signerWallet = (() => {
      if (wallet.id === 'identity wallet') {
        return new EthersWallet(wallet.wallet.uuid);
      } else {
        return wallet.wallet as unknown as Signer;
      }
    })();

    try {
      const preexistingClient = this.clients[address];
      if (preexistingClient !== undefined) {
        return fromXmtpClient(preexistingClient);
      } else {
        const client = await Xmtp.create(signerWallet as unknown as Signer, {
          ...opts,
          codecs: CODECS,
        });
        this.clients[address] = client;
        return fromXmtpClient(client);
      }
    } catch (err) {
      console.error(
        'receiver-worker :: worker.ts :: startClientBySigner :: err',
        err
      );
      return null;
    }
  }

  public fetchClient = async (clientAddress: string) => {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      return null;
    } else {
      return fromXmtpClient(client);
    }
  };

  public async fetchMessages(
    clientAddress: string,
    peerAddress: string,
    opts?: Partial<ListMessagesOptions>
  ) {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      throw new Error(
        JSON.stringify(
          {
            function: 'worker.ts :: fetchMessages',
            clientAddress,
            peerAddress,
            opts,
          },
          null,
          2
        )
      );
    } else {
      const conversation = await client.conversations.newConversation(
        peerAddress
      );
      const messages: Message[] = [];
      for await (const page of conversation.messagesPaginated({
        pageSize: 25,
      })) {
        for (const msg of page) {
          messages.push(fromXmtpMessage(msg));
        }
        break;
      }
      return messages;
    }
  }

  public async fetchConversations(clientAddress: string) {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      throw new Error('Fetching conversations without a client!');
    } else {
      const conversations = await client.conversations.list();
      return conversations.map(fromXmtpConversation);
    }
  }

  public async fetchPeerOnNetwork(clientAddress: string, peerAddress: string) {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      throw new Error('fetchPeerOnNetwork without a client!');
    } else {
      return client.canMessage(peerAddress);
    }
  }

  public async sendMessage(
    clientAddress: string,
    peerAddress: string,
    message: ContentType,
    opts?: Partial<SendOptions>
  ) {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      throw new Error('sendMessage without a client!');
    } else {
      const conversation = await client.conversations.newConversation(
        peerAddress
      );
      const sent = await conversation.send(message, toXmtpSendOptions(opts));
      return fromXmtpMessage(sent);
    }
  }

  public async listenToAllMessagesStream(
    clientAddress: string,
    handler: (message: Message) => unknown
  ) {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      throw new Error('listenToConversationStream without a client!');
    } else {
      const stream = await client.conversations.streamAllMessages();
      (async () => {
        for await (const message of stream) {
          handler(fromXmtpMessage(message));
        }
      })();
      const uuid = Math.random().toString();
      this.streams[uuid] = { return: () => stream.return(undefined) };
      return uuid;
    }
  }

  public async listenToConversationStream(
    clientAddress: string,
    peerAddress: string,
    handler: (message: Message) => unknown
  ) {
    const client = this.clients[clientAddress];
    if (client === undefined) {
      throw new Error('listenToConversationStream without a client!');
    } else {
      const conversation = await client.conversations.newConversation(
        peerAddress
      );
      const stream = await conversation.streamMessages();
      (async () => {
        for await (const message of stream) {
          handler(fromXmtpMessage(message));
        }
      })();
      const uuid = Math.random().toString();
      this.streams[uuid] = stream;
      return uuid;
    }
  }

  public async returnStream(uuid: string) {
    const stream = this.streams[uuid];
    if (stream === undefined) {
      throw new Error('returnStream called with an invalid uuid!');
    } else {
      stream.return();
    }
  }
}

Comlink.expose(XmtpWorker);
