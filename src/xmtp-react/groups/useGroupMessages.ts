import { useMemo, useContext } from 'react';
import { receiverStore } from '../../store';
import { Status } from '../status';

export const useGroupMessages = (groupId: string | null) => {
  const { xmtpStatus, groupMessages } = receiverStore();

  const messages = useMemo(() => {
    if (groupId === null || xmtpStatus !== Status.ready) {
      return {};
    } else {
      return groupMessages[groupId] || {};
    }
  }, [groupId, xmtpStatus]);

  return messages;
};
