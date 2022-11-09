import { GROUPS_ID as NativeGroupsId } from '../../codecs';

export const GROUPS_ID = 'relay.cc/Groups:1.1';

if (GROUPS_ID !== NativeGroupsId.toString()) {
  throw new Error('GROUPS_ID does not match NativeGroupsId');
}

export type GroupsId = typeof GROUPS_ID;
