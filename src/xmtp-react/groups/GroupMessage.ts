import { Message } from '@xmtp/xmtp-js';
import {
  isGroupMessageContentType,
  GroupMessageContentType,
} from './GroupMessageContentType';
import { GroupMessageContent } from './GroupMessageContent';

export type GroupMessage = Message & {
  contentType: GroupMessageContentType;
  content: GroupMessageContent;
};

export const isGroupMessage = (message: Message): message is GroupMessage => {
  return isGroupMessageContentType(message.contentType);
};
