import { ContentCodec, EncodedContent, ContentTypeId } from '@xmtp/xmtp-js';
import { EthAddress, isEthAddress } from '../../eth';
import { Group, isGroup } from './Group';

export const GROUP_INVITE_ID = new ContentTypeId({
  authorityId: 'relay.cc',
  typeId: 'GroupInvite',
  versionMajor: 3,
  versionMinor: 1,
});

export interface GroupInvite {
  inviterAddress: EthAddress;
  group: Group;
}

export const isGroupInvite = (data: unknown): data is GroupInvite => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const groupInvite = data as GroupInvite;
  if (!isEthAddress(groupInvite.inviterAddress)) {
    return false;
  }
  if (!isGroup(groupInvite.group)) {
    return false;
  }
  return true;
};

export class GroupInviteCodec implements ContentCodec<GroupInvite> {
  get contentType(): ContentTypeId {
    return GROUP_INVITE_ID;
  }

  public encode(content: GroupInvite): EncodedContent {
    return {
      type: GROUP_INVITE_ID,
      parameters: {},
      fallback: `This client does not support the content type ${this.contentType.toString()}. See https://xmtp.org/docs/dev-concepts/content-types for more details.`,
      content: new TextEncoder().encode(btoa(JSON.stringify(content))),
    };
  }

  public decode(content: EncodedContent) {
    const result = JSON.parse(
      atob(new TextDecoder().decode(content.content))
    ) as GroupInvite;
    if (!isGroupInvite(result)) {
      throw new Error('decode group invite :: Invalid group invite');
    } else {
      return result;
    }
  }
}
