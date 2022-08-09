import { Conversation } from '@xmtp/xmtp-js';
import { useMemo } from 'react';
import { Status } from '../status';
import { receiverStore } from '../../store';

export const useConversations = () => {
  const { conversations, xmtpStatus, activity } = receiverStore();

  const allConversations = useMemo(() => {
    if (xmtpStatus === Status.ready) {
      return sortByLastMessageTime(conversations, activity);
    } else {
      return [];
    }
  }, [xmtpStatus]);

  return allConversations;
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
