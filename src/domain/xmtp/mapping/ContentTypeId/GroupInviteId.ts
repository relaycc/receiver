import { GROUP_INVITE_ID as NativeGroupInviteId } from '../../codecs';

export const GROUP_INVITE_ID = 'relay.cc/GroupInvite:1.1';

if (GROUP_INVITE_ID !== NativeGroupInviteId.toString()) {
  throw new Error('GROUP_INVITE_ID does not match NativeGroupInviteId');
}

export type GroupInviteId = typeof GROUP_INVITE_ID;
