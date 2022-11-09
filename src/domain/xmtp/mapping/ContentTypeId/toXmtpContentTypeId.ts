import { ContentTypeText } from '@xmtp/xmtp-js';
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

export const toXmtpContentTypeId = (id: ContentTypeId): XmtpContentTypeId => {
  switch (id) {
    case GROUP_ID:
      return XMTP_GROUP_ID;
    case GROUPS_ID:
      return XMTP_GROUPS_ID;
    case GROUP_INVITE_ID:
      return XMTP_GROUP_INVITE_ID;
    case GROUP_MESSAGE_ID:
      return XMTP_GROUP_MESSAGE_ID;
    case IGNORED_ADDRESSES_ID:
      return XMTP_IGNORED_ADDRESSES_ID;
    case PINNED_ADDRESSES_ID:
      return XMTP_PINNED_ADDRESSES_ID;
    default:
      return ContentTypeText;
  }
};
