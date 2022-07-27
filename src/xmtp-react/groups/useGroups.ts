import { useMemo, useContext } from 'react';
import { Group, fromGroupMessage } from '../groups';
import { XmtpContext, Status } from '../context';

export const useGroups = () => {
  const xmtp = useContext(XmtpContext);

  const groups = useMemo(() => {
    if (xmtp.status === Status.ready) {
      const groups: Record<string, Group> = {};
      // We derive the groups from the groupMessages because a "group" is not a
      // native XMTP construct.
      for (const [groupId, messages] of Object.entries(xmtp.groupMessages)) {
        const aMessageFromTheGroup = Object.values(messages)[0];
        const group = fromGroupMessage(aMessageFromTheGroup);
        groups[groupId] = group;
      }
      return groups;
    } else {
      return {};
    }
  }, [xmtp]);

  return groups;
};
