import { createContext } from 'react';
import { Conversation, Message, Client } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';
import { GroupMessage } from '../groups';

export enum Status {
  disconnected = 'no signer available',
  idle = 'idle',
  waiting = 'waiting on signature',
  denied = 'signature denied',
  loading = 'loading messages',
  ready = 'ready',
  error = 'error',
}

export interface DisconnectedXmtp {
  status: Status.disconnected;
}

export interface IdleXmtp {
  status: Status.idle;
  init: () => unknown;
}

export interface WaitingXmtp {
  status: Status.waiting;
}

export interface LoadingXmtp {
  status: Status.loading;
  deinit: () => unknown;
}

export interface DeniedXmtp {
  status: Status.denied;
  init: () => unknown;
}

export interface ReadyXmtp {
  status: Status.ready;
  deinit: () => unknown;
  conversations: Record<string, Conversation>;
  messages: Record<string, Record<string, Message>>;
  groupMessages: Record<string, Record<string, GroupMessage>>;
  activity: Record<string, Date>;
  client: Client;
}

export interface ErrorXmtp {
  status: Status.error;
  init: (wallet: Signer) => Promise<unknown>;
}

export type XmtpContextType =
  | DisconnectedXmtp
  | IdleXmtp
  | WaitingXmtp
  | DeniedXmtp
  | LoadingXmtp
  | ReadyXmtp
  | ErrorXmtp;

export const XmtpContext = createContext<XmtpContextType>({
  status: Status.disconnected,
});
