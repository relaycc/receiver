import { createContext } from 'react';
import { Message, ListMessagesOptions, Conversation } from '@relaycc/xmtp-js';

export interface ReceiverConfig {
  api?: {
    fetchMessages?: (
      peerAddress: string,
      opts?: Partial<ListMessagesOptions>
    ) => Promise<Message[]>;
    fetchConversations?: () => Promise<Conversation[]>;
    startClient: (keys: Uint8Array) => Promise<boolean>;
  };
}

export const ReceiverContext = createContext<
  | {
      config?: ReceiverConfig;
    }
  | undefined
>(undefined);
