import { useMemo } from 'react';
import { Status } from '../status';
import { Message } from '@xmtp/xmtp-js';
import { receiverStore } from '../../store';

export const useMessages = (peerAddress: string | null | undefined) => {
  const { messages, xmtpStatus } = receiverStore();

  const alMessages = useMemo(() => {
    if (
      xmtpStatus !== Status.ready ||
      peerAddress === undefined ||
      peerAddress === null
    ) {
      return {};
    } else {
      return messages[peerAddress] || {};
    }
  }, [xmtpStatus, peerAddress]);

  return alMessages;
};

export const getLastMessage = (
  messages: Record<string, Message>
): Message | null => {
  const messagesList = Object.values(messages);
  if (messagesList.length === 0) return null;
  return messagesList.reduce((currentMostRecent, nextMessage) => {
    const tCurrent = currentMostRecent.sent?.getTime() || -Infinity;
    const tNext = nextMessage.sent?.getTime() || -Infinity;
    if (tCurrent > tNext) {
      return currentMostRecent;
    } else {
      return nextMessage;
    }
  });
};
