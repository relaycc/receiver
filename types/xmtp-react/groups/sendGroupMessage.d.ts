import { Client } from '@xmtp/xmtp-js';
import { GroupMessageContent } from './GroupMessageContent';
export declare const sendGroupMessage: (client: Client, content: GroupMessageContent) => Promise<false | void[]>;
