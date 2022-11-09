import { Group, isGroup } from './Group';
import { ContentTypeId, ContentCodec, EncodedContent } from '@xmtp/xmtp-js';
import { EthAddress } from '../../eth';

export const GROUPS_ADDRESS = '0x4B5B5EFe6dfBF2ECFD55eA9cE3108977Fc9cfc5F';

export const GROUPS_ID = new ContentTypeId({
  authorityId: 'relay.cc',
  typeId: 'Groups',
  versionMajor: 3,
  versionMinor: 1,
});

export interface Groups {
  groups: Record<EthAddress, Group>;
}

export const isGroups = (data: unknown): data is Groups => {
  try {
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    const groups = data as Groups;
    if (typeof groups.groups !== 'object' || groups.groups === null) {
      return false;
    }
    for (const group of Object.values(groups.groups)) {
      if (!isGroup(group)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
};

export const addGroup = (groups: Groups, group: Group): Groups | null => {
  const newGroups = { ...groups };
  if (newGroups.groups[group.wallet.wallet.address] !== undefined) {
    return null;
  } else {
    newGroups.groups[group.wallet.wallet.address] = group;
    return newGroups;
  }
};

export const removeGroup = (groups: Groups, group: Group): Groups | null => {
  const newGroups = { ...groups };
  if (newGroups.groups[group.wallet.wallet.address] === undefined) {
    return null;
  } else {
    delete newGroups.groups[group.wallet.wallet.address];
    return newGroups;
  }
};

export class GroupsCodec implements ContentCodec<Groups> {
  get contentType(): ContentTypeId {
    return GROUPS_ID;
  }

  public encode(content: Groups): EncodedContent {
    return {
      type: GROUPS_ID,
      parameters: {},
      fallback: `This client does not support the content type ${this.contentType.toString()}. See https://xmtp.org/docs/dev-concepts/content-types for more details.`,
      content: new TextEncoder().encode(btoa(JSON.stringify(content))),
    };
  }

  public decode(content: EncodedContent): Groups {
    const result = JSON.parse(
      atob(new TextDecoder().decode(content.content))
    ) as Groups;
    if (!isGroups(result)) {
      throw new Error('decode groups :: Invalid groups');
    } else {
      return result;
    }
  }
}
