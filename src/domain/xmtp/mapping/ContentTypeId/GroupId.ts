import { GROUP_ID as XmtpGroupId } from '../../codecs';

export const GROUP_ID = 'relay.cc/group:1.1';

if (GROUP_ID !== XmtpGroupId.toString()) {
  throw new Error('GROUP_ID does not match NativeGroupId');
}

export type GroupId = typeof GROUP_ID;
