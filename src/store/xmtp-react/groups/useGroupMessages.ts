import { useMemo, useContext } from 'react';
import { XmtpContext, Status } from '../context';

export const useGroupMessages = (groupId: string | null) => {
  const xmtp = useContext(XmtpContext);

  const messages = useMemo(() => {
    if (groupId === null || xmtp.status !== Status.ready) {
      return {};
    } else {
      return xmtp.groupMessages[groupId] || {};
    }
  }, [groupId, xmtp]);

  return messages;
};
