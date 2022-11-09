import { GROUP_ID } from './Group';
import { GROUP_INVITE_ID } from './GroupInvite';
import { GROUP_MESSAGE_ID } from './GroupMessage';
import { IGNORED_ADDRESSES_ID } from './IgnoredAddresses';
import { PINNED_ADDRESSES_ID } from './PinnedAddresses';
import { GROUPS_ID } from './Groups';

export type XmtpContentTypeId =
  | typeof GROUP_ID
  | typeof GROUP_INVITE_ID
  | typeof GROUP_MESSAGE_ID
  | typeof IGNORED_ADDRESSES_ID
  | typeof PINNED_ADDRESSES_ID
  | typeof GROUPS_ID;
