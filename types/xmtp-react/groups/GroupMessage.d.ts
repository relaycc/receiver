import { Message } from '@xmtp/xmtp-js';
import { GroupMessageContentType } from './GroupMessageContentType';
import { GroupMessageContent } from './GroupMessageContent';
export declare type GroupMessage = Message & {
    contentType: GroupMessageContentType;
    content: GroupMessageContent;
};
export declare const isGroupMessage: (message: Message) => message is GroupMessage;
