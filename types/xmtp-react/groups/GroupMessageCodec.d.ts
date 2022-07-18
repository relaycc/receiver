import { ContentTypeId, ContentCodec, EncodedContent } from '@xmtp/xmtp-js';
import { GroupMessageContent } from './GroupMessageContent';
export declare class GroupMessageDecodeError extends Error {
    constructor(message?: string);
}
export declare class GroupMessageCodec implements ContentCodec<GroupMessageContent> {
    get contentType(): ContentTypeId;
    encode(content: GroupMessageContent): EncodedContent;
    decode(content: EncodedContent): GroupMessageContent;
}
