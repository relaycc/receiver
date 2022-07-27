import { ContentTypeId, ContentCodec, EncodedContent } from '@xmtp/xmtp-js';
import {
  GroupMessageContent,
  isGroupMessageContent,
  GROUP_MESSAGE_FALLBACK_CONTENT,
} from './GroupMessageContent';
import { GROUP_MESSAGE_CONTENT_TYPE } from './GroupMessageContentType';

export class GroupMessageDecodeError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'GroupMessageDecodeError';
  }
}

export class GroupMessageCodec implements ContentCodec<GroupMessageContent> {
  get contentType(): ContentTypeId {
    return GROUP_MESSAGE_CONTENT_TYPE;
  }

  public encode(content: GroupMessageContent): EncodedContent {
    return {
      type: GROUP_MESSAGE_CONTENT_TYPE,
      parameters: {},
      fallback: 'This was a group message that failed to decode',
      content: new TextEncoder().encode(JSON.stringify(content)),
    };
  }

  public decode(content: EncodedContent): GroupMessageContent {
    const bytes = new TextDecoder().decode(content.content);
    const json = JSON.parse(bytes) as unknown;
    if (!isGroupMessageContent(json)) {
      // TODO Not really sure what the best thing to do here is, maybe there
      // should be an onDecodeError parameter?
      // throw new GroupMessageDecodeError();
      return GROUP_MESSAGE_FALLBACK_CONTENT;
    } else {
      return json as GroupMessageContent;
    }
  }
}
