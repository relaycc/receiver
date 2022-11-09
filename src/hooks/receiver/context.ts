import { createContext } from 'react';
import { XmtpClient } from '../../domain';

export interface ReceiverConfig {
  xmtp: {
    network: 'dev' | 'production';
    client: XmtpClient;
  };
}

export type ReceiverContextType = {
  config: ReceiverConfig | null;
};

export const ReceiverContext = createContext<ReceiverContextType | undefined>(
  undefined
);
