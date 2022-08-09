import { useMemo, useContext } from 'react';
import { Group, fromGroupMessage } from '.';
import { receiverStore } from '../../store';
import { Status } from '../status';

export const useGroups = () => {
  const { xmtpStatus, groupMessages } = receiverStore();

  const groups = useMemo(() => {
    if (xmtpStatus === Status.ready) {
      const groups: Record<string, Group> = {};
      // We derive the groups from the groupMessages because a "group" is not a
      // native XMTP construct.
      for (const [groupId, messages] of Object.entries(groupMessages)) {
        const aMessageFromTheGroup = Object.values(messages)[0];
        const group = fromGroupMessage(aMessageFromTheGroup);
        groups[groupId] = group;
      }
      return groups;
    } else {
      return {};
    }
  }, [xmtpStatus]);

  return groups;
};
