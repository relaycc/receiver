import {
  XmtpContentTypeId,
  GROUP_ID as XMTP_GROUP_ID,
  GROUPS_ID as XMTP_GROUPS_ID,
  GROUP_INVITE_ID as XMTP_GROUP_INVITE_ID,
  GROUP_MESSAGE_ID as XMTP_GROUP_MESSAGE_ID,
  IGNORED_ADDRESSES_ID as XMTP_IGNORED_ADDRESSES_ID,
  PINNED_ADDRESSES_ID as XMTP_PINNED_ADDRESSES_ID,
} from '../../codecs';
import { GROUP_ID } from './GroupId';
import { GROUPS_ID } from './GroupsId';
import { GROUP_INVITE_ID } from './GroupInviteId';
import { GROUP_MESSAGE_ID } from './GroupMessageId';
import { PINNED_ADDRESSES_ID } from './PinnedAddressesId';
import { IGNORED_ADDRESSES_ID } from './IgnoredAddressesId';
import { ContentTypeId } from './ContentTypeId';

export const fromXmtpContentTypeId = (id: XmtpContentTypeId): ContentTypeId => {
  switch (id) {
    case XMTP_GROUP_ID:
      return GROUP_ID;
    case XMTP_GROUPS_ID:
      return GROUPS_ID;
    case XMTP_GROUP_INVITE_ID:
      return GROUP_INVITE_ID;
    case XMTP_GROUP_MESSAGE_ID:
      return GROUP_MESSAGE_ID;
    case XMTP_IGNORED_ADDRESSES_ID:
      return IGNORED_ADDRESSES_ID;
    case XMTP_PINNED_ADDRESSES_ID:
      return PINNED_ADDRESSES_ID;
    default:
      return 'xmtp.org/text:0.1';
  }
};
