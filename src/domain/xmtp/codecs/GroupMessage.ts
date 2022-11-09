import { ContentTypeId, ContentCodec, EncodedContent } from '@xmtp/xmtp-js';
import { EthAddress, isEthAddress } from '../../eth';
export const GROUP_MESSAGE_ID = new ContentTypeId({
  authorityId: 'relay.cc',
  typeId: 'GroupMessage',
  versionMajor: 3,
  versionMinor: 1,
});

export interface GroupMessage {
  senderAddress: EthAddress;
  message: string;
}

export const isGroupMessage = (data: unknown): data is GroupMessage => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const group = data as GroupMessage;
  if (isEthAddress(group.senderAddress)) {
    return false;
  }
  if (typeof group.message !== 'string') {
    return false;
  }
  return true;
};

export class GroupMessageCodec implements ContentCodec<GroupMessage> {
  get contentType(): ContentTypeId {
    return GROUP_MESSAGE_ID;
  }

  public encode(content: GroupMessage): EncodedContent {
    return {
      type: GROUP_MESSAGE_ID,
      parameters: {},
      fallback: `This client does not support the content type ${this.contentType.toString()}. See https://xmtp.org/docs/dev-concepts/content-types for more details.`,
      content: new TextEncoder().encode(btoa(JSON.stringify(content))),
    };
  }

  public decode(content: EncodedContent): GroupMessage {
    const result = JSON.parse(
      atob(new TextDecoder().decode(content.content))
    ) as GroupMessage;
    if (!isGroupMessage(result)) {
      throw new Error('decode group message :: Invalid group');
    } else {
      return result;
    }
  }
}
