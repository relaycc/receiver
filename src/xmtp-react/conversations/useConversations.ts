import { Conversation } from '@xmtp/xmtp-js';
import { useMemo } from 'react';
import { Status, useXmtp } from '../context';

export const useConversations = () => {
  const xmtp = useXmtp();

  const conversations = useMemo(() => {
    if (xmtp.status === Status.ready) {
      return sortByLastMessageTime(xmtp.conversations, xmtp.activity);
    } else {
      return [];
    }
  }, [xmtp]);

  return conversations;
};

export const sortByLastMessageTime = (
  conversations: Record<string, Conversation>,
  activity: Record<string, Date | undefined>
): string[] => {
  const peerAddresses = Object.keys(conversations);
  return peerAddresses.sort((a, b) => {
    const tA = activity[a] || -Infinity;
    const tB = activity[b] || -Infinity;
    if (tA === tB) return 0;
    if (tA > tB) return -1;
    return 1;
  });
};
