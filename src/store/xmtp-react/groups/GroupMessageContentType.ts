import { ContentTypeId } from '@xmtp/xmtp-js';

export const GROUP_MESSAGE_CONTENT_TYPE = new ContentTypeId({
  authorityId: 'daopanel.com',
  typeId: 'group message',
  versionMajor: 0,
  versionMinor: 1,
});

// Just an alias because I'm not sure how to correctly type this.
export type GroupMessageContentType = ContentTypeId;

export const isGroupMessageContentType = (
  obj: unknown
): obj is GroupMessageContentType => {
  try {
    if ((obj as ContentTypeId).authorityId !== 'daopanel.com') return false;
    if ((obj as ContentTypeId).typeId !== 'group message') return false;
    return true;
  } catch (err) {
    return false;
  }
};
