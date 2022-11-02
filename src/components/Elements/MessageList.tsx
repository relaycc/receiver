import { useQueryClient } from '@tanstack/react-query';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Message, useMessages, receiverContext, useConfig } from '../../hooks';
import { motion } from 'framer-motion';
import { MessagesBucket, MessagesBucketProps } from './MessagesBucket';

type MessageBucket = MessagesBucketProps['bucket'];

export interface MessageListProps {
  clientAddress: string;
  peerAddress: string;
  parseMessage?: (message: Message) => Message;
  setDoScroll: (doScroll: () => unknown) => unknown;
}

export const MessageList: FunctionComponent<MessageListProps> = ({
  clientAddress,
  peerAddress,
  parseMessage,
  setDoScroll,
}) => {
  const queryClient = useQueryClient({ context: receiverContext });
  const messagesQuery = useMessages({ peerAddress, clientAddress });
  const bottomDiv = useRef<HTMLDivElement>(null);
  const config = useConfig();

  useEffect(() => {
    if (config === null) {
      return;
    } else {
      const listener = config.xmtp.client.listenToConversationStream(
        clientAddress,
        peerAddress,
        async (message: Message) => {
          queryClient.invalidateQueries([
            'messages',
            clientAddress,
            message.senderAddress,
          ]);
          queryClient.invalidateQueries([
            'messages',
            clientAddress,
            message.recipientAddress,
          ]);
        }
      );
      return () => {
        listener.then(({ unlisten }) => unlisten());
      };
    }
  }, [config]);

  useEffect(() => {
    if (bottomDiv.current) {
      setDoScroll(() => {
        bottomDiv.current?.scrollIntoView();
      });
    }
  }, [bottomDiv.current]);

  const withoutUndefined = (
    messagesQuery.data
      ? messagesQuery.data.messages.filter((m) => m !== undefined)
      : []
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
