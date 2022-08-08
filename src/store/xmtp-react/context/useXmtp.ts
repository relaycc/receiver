import { useContext } from 'react';
import { XmtpContext } from './XmtpContext';

export const useXmtp = () => {
  const xmtp = useContext(XmtpContext);

  if (xmtp === undefined) {
    throw new Error('useXmtp must be used within an XmtpContextProvider');
  }

  return xmtp;
};
