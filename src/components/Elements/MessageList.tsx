import React, { FunctionComponent, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessagesBucket, MessagesBucketProps } from './MessagesBucket';
import {
  EthAddress,
  useFetchMessages,
  Message,
  Conversation,
} from '@relaycc/xmtp-hooks';

type MessageBucket = MessagesBucketProps['bucket'];

export interface MessageListProps {
  clientAddress: EthAddress;
  conversation: Conversation;
  parseMessage?: (message: Message) => Message;
  setDoScroll: (doScroll: () => unknown) => unknown;
}

export const MessageList: FunctionComponent<MessageListProps> = ({
  clientAddress,
  conversation,
  parseMessage,
  setDoScroll,
}) => {
  const messagesQuery = useFetchMessages({
    // TODO - Type this better.
    conversation,
    clientAddress,
  });
  const bottomDiv = useRef<HTMLDivElement>(null);

  // TODO - stream messages and invalidate queries

  useEffect(() => {
    if (bottomDiv.current) {
      setDoScroll(() => {
        bottomDiv.current?.scrollIntoView();
      });
    }
  }, [bottomDiv.current]);

  const withoutUndefined = (
    messagesQuery.data ? messagesQuery.data.filter((m) => m !== undefined) : []
  ) as Message[];

  const parsedMessages = withoutUndefined.map((message) => {
    if (parseMessage) {
      return parseMessage(message);
    } else {
      return message;
    }
  });

  const buckets = getMessageBuckets(parsedMessages);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="MessageList List">
      <div ref={bottomDiv} />
      {buckets
        .map((x) => x)
        .reverse()
        .map((bucket) => {
          return <MessagesBucket key={bucket.messages[0].id} bucket={bucket} />;
        })}
    </motion.div>
  );
};

// This assumets messages are sorted by date already.
function getMessageBuckets(messages: Message[]): MessageBucket[] {
  const buckets: MessageBucket[] = [];
  const currentBucket = () => buckets[0];
  const currentSender = () => currentBucket()?.peerAddress;
  const currentMessage = () => currentBucket()?.messages[0];
  const currentSent = () => currentMessage()?.sent;

  for (const message of messages) {
    const shouldStartNewBucket = () => {
      if (currentBucket() === undefined) {
        return true;
      }
      if (currentSender() !== message.senderAddress) {
        return true;
      }
      if (currentSent()) {
        if (isFiveMinuteDifference(currentSent(), message.sent)) {
          return true;
        }
      }
    };

    if (shouldStartNewBucket()) {
      buckets.unshift({
        peerAddress: message.senderAddress,
        messages: [message],
      });
    } else {
      buckets[0].messages.push(message);
    }
  }

  return buckets;
}

function isFiveMinuteDifference(a: Date, b: Date): boolean {
  // 300000 is milliseconds in 5 minutes
  return Math.abs(a.getTime() - b.getTime()) > 300000;
}
