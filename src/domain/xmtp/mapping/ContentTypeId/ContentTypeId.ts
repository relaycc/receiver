import { GroupId } from './GroupId';
import { GroupsId } from './GroupsId';
import { GroupInviteId } from './GroupInviteId';
import { GroupMessageId } from './GroupMessageId';
import { PinnedAddressesId } from './PinnedAddressesId';
import { IgnoredAddressesId } from './IgnoredAddressesId';

export type ContentTypeId =
  | GroupId
  | GroupsId
  | GroupInviteId
  | GroupMessageId
  | PinnedAddressesId
  | IgnoredAddressesId
  | 'xmtp.org/text:0.1';
