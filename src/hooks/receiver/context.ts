import { createContext } from 'react';
import { XmtpApi, XmtpNetwork } from '../types';

export interface ReceiverConfig {
  xmtp: {
    network: XmtpNetwork;
    client: XmtpApi;
  };
}

export type ReceiverContextType = {
  config: ReceiverConfig | null;
};

export const ReceiverContext = createContext<ReceiverContextType | undefined>(
  undefined
);
