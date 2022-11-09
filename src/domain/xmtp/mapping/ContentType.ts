import * as ContentTypes from '../codecs';

export type ContentType =
  | ContentTypes.GroupMessage
  | ContentTypes.Group
  | ContentTypes.Groups
  | ContentTypes.GroupInvite
  | ContentTypes.IgnoredAddresses
  | ContentTypes.PinnedAddresses
  | string;
