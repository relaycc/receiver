import { useQueryClient } from '@tanstack/react-query';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useMessages, receiverContext, useConfig } from '../../hooks';
import { motion } from 'framer-motion';
import { MessagesBucket } from './MessagesBucket';
import {
  MessageBucket,
  getBucketSender,
  getBucketSent,
  getUniqueKey,
  isGroupInviteBucket,
  isMessageBucket,
} from '../../utils';
import {
  Message,
  EthAddress,
  isText,
  isGroupInvite,
  isEthAddress,
} from '../../domain';

export interface MessageListProps {
  clientAddress: EthAddress;
  peerAddress: EthAddress;
  setDoScroll: (doScroll: () => unknown) => unknown;
}

export const MessageList: FunctionComponent<MessageListProps> = ({
  clientAddress,
  peerAddress,
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

  const buckets = getMessageBuckets(withoutUndefined);
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
          return <MessagesBucket key={getUniqueKey(bucket)} bucket={bucket} />;
        })}
    </motion.div>
  );
};

// This assumets messages are sorted by date already.
function getMessageBuckets(messages: Message[]): MessageBucket[] {
  const buckets: MessageBucket[] = [];
  const currentBucket = () => buckets[0];
  const currentSender = () => getBucketSender(currentBucket());
  const currentSent = () => getBucketSent(currentBucket());

  for (const message of messages) {
    const shouldStartNewBucket = () => {
      if (!isText(message.content)) {
        return true;
      }
      if (isGroupInviteBucket(currentBucket())) {
        return true;
      }
      if (!isMessageBucket(currentBucket())) {
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
      return false;
    };

    if (shouldStartNewBucket()) {
      if (isText(message.content)) {
        if (!isEthAddress(message.senderAddress)) {
          continue;
        } else {
          buckets.unshift({
            id: 'text messages bucket',
            peerAddress: message.senderAddress,
            messages: [message],
          });
        }
      } else if (isGroupInvite(message.content)) {
        buckets.unshift({
          id: 'group invite bucket',
          message: message,
        });
      } else {
        console.warn('You got an unsupported message type', message);
        continue;
      }
    } else {
      const bucket = currentBucket();
      if (isGroupInviteBucket(bucket)) {
        throw new Error("Can't add a message to a group invite bucket");
      } else {
        bucket.messages.push(message);
      }
    }
  }

  return buckets;
}

function isFiveMinuteDifference(a: Date, b: Date): boolean {
  // 300000 is milliseconds in 5 minutes
  return Math.abs(a.getTime() - b.getTime()) > 300000;
}
