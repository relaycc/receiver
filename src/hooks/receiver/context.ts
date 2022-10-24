import { createContext } from 'react';
import { XmtpApi, XmtpNetwork } from '../types';

export interface ReceiverConfig {
  xmtp: {
    network: XmtpNetwork;
    client: XmtpApi;
  };
}

export const ReceiverContext = createContext<
  { config: ReceiverConfig } | undefined
>(undefined);
