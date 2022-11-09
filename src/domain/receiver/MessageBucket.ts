import { EthAddress, isEthAddress, isGroupInvite, Message } from '..';

export interface TextMessageBucket {
  id: 'text messages bucket';
  peerAddress: EthAddress;
  messages: Message[];
}

export interface GroupInviteBucket {
  id: 'group invite bucket';
  message: Message;
}

export type MessageBucket = TextMessageBucket | GroupInviteBucket;

export const isMessageBucket = (bucket: unknown): bucket is MessageBucket => {
  return isTextMessageBucket(bucket) || isGroupInviteBucket(bucket);
};

export const isTextMessageBucket = (
  bucket: unknown
): bucket is TextMessageBucket => {
  if (typeof bucket !== 'object' || bucket === null) {
    return false;
  }
  if ((bucket as TextMessageBucket).id !== 'text messages bucket') {
    return false;
  }
  if (!isEthAddress((bucket as TextMessageBucket).peerAddress)) {
    return false;
  }
  if (!Array.isArray((bucket as TextMessageBucket).messages)) {
    return false;
  }
  return true;
};

export const isGroupInviteBucket = (
  bucket: unknown
): bucket is GroupInviteBucket => {
  if (typeof bucket !== 'object' || bucket === null) {
    return false;
  }
  if ((bucket as GroupInviteBucket).id !== 'group invite bucket') {
    return false;
  }
  if (!isGroupInvite((bucket as GroupInviteBucket).message.content)) {
    return false;
  }
  return true;
};

export const getUniqueKey = (bucket: MessageBucket): string => {
  if (isTextMessageBucket(bucket)) {
    return bucket.messages[0].id;
  } else if (isGroupInviteBucket(bucket)) {
    return bucket.message.id;
  } else {
    throw new Error('getUniqueKey :: Invalid bucket');
  }
};

export const getBucketSender = (bucket: MessageBucket): EthAddress => {
  if (isTextMessageBucket(bucket)) {
    return bucket.peerAddress;
  } else if (isGroupInviteBucket(bucket)) {
    if (!isGroupInvite(bucket.message.content)) {
      throw new Error('getBucketSender :: Invalid bucket');
    } else {
      return bucket.message.content.inviterAddress;
    }
  } else {
    throw new Error('getBucketSender :: Invalid bucket');
  }
};

export const getBucketMessage = (bucket: MessageBucket): Message => {
  if (isTextMessageBucket(bucket)) {
    return bucket.messages[0];
  } else if (isGroupInviteBucket(bucket)) {
    return bucket.message;
  } else {
    throw new Error('getCurrentMessage :: Invalid bucket');
  }
};

export const getBucketSent = (bucket: MessageBucket): Date => {
  if (isTextMessageBucket(bucket)) {
    return bucket.messages[0].sent;
  } else if (isGroupInviteBucket(bucket)) {
    return bucket.message.sent;
  } else {
    throw new Error('getCurrentSent :: Invalid bucket');
  }
};
