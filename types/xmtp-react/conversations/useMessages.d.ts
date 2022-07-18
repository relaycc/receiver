import { Message } from '@xmtp/xmtp-js';
export declare const useMessages: (peerAddress: string | null | undefined) => Record<string, Message>;
export declare const getLastMessage: (messages: Record<string, Message>) => Message | null;
