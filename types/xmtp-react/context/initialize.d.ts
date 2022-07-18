import { Client, Conversation, Message } from '@xmtp/xmtp-js';
import { GroupMessage } from '../groups';
import { Signer } from 'ethers';
export declare const initialize: (wallet: Signer, onWaitingForSignature: () => unknown, onClientConnect: (client: Client) => unknown, onClientError: (error: unknown) => unknown, onNewConversation: (conversation: Conversation) => unknown, onConversationsLoaded: (conversations: Conversation[]) => unknown, onNewMessage: (conversation: Conversation, message: Message) => unknown, onNewGroupMessage: (message: GroupMessage) => unknown, onMessagesLoaded: () => unknown) => Promise<void>;
