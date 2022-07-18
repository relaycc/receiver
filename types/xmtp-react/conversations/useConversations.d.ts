import { Conversation } from '@xmtp/xmtp-js';
export declare const useConversations: () => string[];
export declare const sortByLastMessageTime: (conversations: Record<string, Conversation>, activity: Record<string, Date | undefined>) => string[];
