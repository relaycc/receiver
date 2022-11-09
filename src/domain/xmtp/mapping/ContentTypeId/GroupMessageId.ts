import { GROUP_MESSAGE_ID as NativeGroupMessageId } from '../../codecs';

export const GROUP_MESSAGE_ID = 'relay.cc/GroupMessage:1.1';

if (GROUP_MESSAGE_ID !== NativeGroupMessageId.toString()) {
  throw new Error('GROUP_MESSAGE_ID does not match NativeGroupMessageId');
}

export type GroupMessageId = typeof GROUP_MESSAGE_ID;
