import { useMemo } from 'react';
import { useXmtp, Status } from './../context';
import { Message } from '@xmtp/xmtp-js';

export const useMessages = (peerAddress: string | null | undefined) => {
  const xmtp = useXmtp();

  const messages = useMemo(() => {
    if (
      xmtp.status !== Status.ready ||
      peerAddress === undefined ||
      peerAddress === null
    ) {
      return {};
    } else {
      return xmtp.messages[peerAddress] || {};
    }
  }, [xmtp, peerAddress]);

  return messages;
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
