import { useMemo } from 'react';
import { useXmtp, Status as ClientStatus } from './../context';

export enum Status {
  ready = 'ready',
  idle = 'idle',
}

export interface ReadySendMessage {
  status: Status.ready;
  send: (peerAddress: string, content: string) => Promise<unknown>;
}

export interface IdleSendMessage {
  status: Status.idle;
}

export type SendMessage = ReadySendMessage | IdleSendMessage;

export const useSendMessage = () => {
  const xmtp = useXmtp();

  const sendMessage: SendMessage = useMemo(() => {
    if (xmtp.status !== ClientStatus.ready) {
      return { status: Status.idle };
    } else {
      return {
        status: Status.ready,
        send: (peerAddress: string, content: string) =>
          xmtp.client.sendMessage(peerAddress, content),
      };
    }
  }, [xmtp]);

  return sendMessage;
};
