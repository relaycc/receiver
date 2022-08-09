import { useMemo } from 'react';
import { receiverStore } from '../../store';
import { Status as ClientStatus } from '../status';

export enum Status {
  ready = 'ready',
  idle = 'idle',
  error = 'error'
}

export interface ReadySendMessage {
  status: Status.ready;
  send: (peerAddress: string, content: string) => Promise<unknown>;
}

export interface IdleSendMessage {
  status: Status.idle;
}

export interface ErrorSendMessage {
  status: Status.error;
}

export type SendMessage = ReadySendMessage | IdleSendMessage | ErrorSendMessage;

export const useSendMessage = () => {
  const { client, xmtpStatus } = receiverStore();

  const sendMessage: SendMessage = useMemo(() => {
    if (xmtpStatus !== ClientStatus.ready) {
      return { status: Status.idle };
    } else if (client) {
      return {
        status: Status.ready,
        send: (peerAddress: string, content: string) =>
          client.sendMessage(peerAddress, content),
      };
    } else {
      return { status: Status.error };
    }
  }, [xmtpStatus]);
  return sendMessage;
};