import { useCallback, useContext } from 'react';
import { Status } from '../status';
import { Group, sendGroupMessage, fromGroupAndPayload } from '.';
import { receiverStore } from '../../store';

export const useSendGroupMessage = () => {
  const { xmtpStatus, client } = receiverStore();

  const callback = useCallback(
    async (group: Group, payload: string) => {
      if (xmtpStatus === Status.ready) {
        const content = fromGroupAndPayload(group, payload);
        try {
          client && await sendGroupMessage(client, content);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [xmtpStatus]
  );

  return callback;
};
