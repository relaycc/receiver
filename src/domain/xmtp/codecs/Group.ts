import { ContentTypeId, ContentCodec, EncodedContent } from '@xmtp/xmtp-js';
import { IdentityWallet, isIdentityWallet } from '../mapping';

export const GROUP_ID = new ContentTypeId({
  authorityId: 'relay.cc',
  typeId: 'Group',
  versionMajor: 3,
  versionMinor: 1,
});

export interface Group {
  wallet: IdentityWallet;
  name: string;
  description?: string;
}

export const isGroup = (group: unknown): group is Group => {
  if (typeof group !== 'object' || group === null) {
    return false;
  }
  if (typeof (group as Group).name !== 'string') {
    return false;
  }
  if (typeof (group as Group).description !== 'string') {
    if (typeof (group as Group).description !== 'undefined') {
      return false;
    }
  }
  if (!isIdentityWallet((group as Group).wallet)) {
    return false;
  }
  return true;
};

export class GroupCodec implements ContentCodec<Group> {
  get contentType(): ContentTypeId {
    return GROUP_ID;
  }

  public encode(content: Group): EncodedContent {
    return {
      type: GROUP_ID,
      parameters: {},
      fallback: `This client does not support the content type ${this.contentType.toString()}. See https://xmtp.org/docs/dev-concepts/content-types for more details.`,
      content: new TextEncoder().encode(btoa(JSON.stringify(content))),
    };
  }

  public decode(content: EncodedContent): Group {
    const result = JSON.parse(
      atob(new TextDecoder().decode(content.content))
    ) as Group;
    if (!isGroup(result)) {
      throw new Error('decode group :: Invalid group');
    } else {
      return result;
    }
  }
}
