import { useCallback, useContext } from 'react';
import { XmtpContext, Status } from '../context';
import { Group, sendGroupMessage, fromGroupAndPayload } from '../groups';

export const useSendGroupMessage = () => {
  const xmtp = useContext(XmtpContext);

  const callback = useCallback(
    async (group: Group, payload: string) => {
      if (xmtp.status === Status.ready) {
        const content = fromGroupAndPayload(group, payload);
        try {
          await sendGroupMessage(xmtp.client, content);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [xmtp]
  );

  return callback;
};
