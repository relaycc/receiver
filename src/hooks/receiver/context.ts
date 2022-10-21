import { createContext } from 'react';

export interface ReceiverConfig {
  xmtp?: {
    network?: 'dev' | 'production';
  };
}

export const ReceiverContext = createContext<
  | {
      config?: ReceiverConfig;
    }
  | undefined
>(undefined);
