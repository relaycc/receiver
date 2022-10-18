import { useQueryClient } from '@tanstack/react-query';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import {
  Message,
  useMessages,
  useConversationMessagesStream,
  useXmtp,
  receiverContext,
} from '../../hooks';
import { motion } from 'framer-motion';
import MessagesBucket from '../Elements/MessagesBucket';

export interface MessageListProps {
  peerAddress: string;
  isEnterPressed: boolean;
}

export const MessageList: FunctionComponent<MessageListProps> = ({
  peerAddress,
  isEnterPressed,
}) => {
  const queryClient = useQueryClient({ context: receiverContext });
  const messagesQuery = useMessages({ peerAddress });
  const streamQuery = useConversationMessagesStream({ peerAddress });
  const address = useXmtp((state) => state.address);


  const bottomDiv: any= useRef();

  function scrollToBottom ()  {
    bottomDiv.current.scrollIntoView();
  }

  useEffect(() => {
    if (bottomDiv.current == undefined) {
      console.log('undefined')
      return
    } else {
      scrollToBottom()
      console.log('scrolled');
    }
  }, [isEnterPressed]);

  useEffect(() => {
    (async () => {
      if (streamQuery.data === undefined || address === null) {
        return;
      } else {
        for await (const message of streamQuery.data) {
          queryClient.invalidateQueries([
            'messages',
            address,
            message.senderAddress,
          ]);
          queryClient.invalidateQueries([
            'messages',
            address,
            message.recipientAddress,
          ]);
        }
      }
    })();
  }, [streamQuery.data, address]);

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
      <div ref={bottomDiv}>bottom div</div>

      {buckets.map((bucket, index) => {
        if (bucket.length > 0) {
          return (
            <MessagesBucket
              key={String(index)}
              messages={bucket}
              userPeerAddress={address}
              startDate={bucket[bucket.length - 1].sent}
              peerName={peerAddress}
              sentByAddress={bucket[0].senderAddress}
            />
          );
        }
        return null;
      })}
    </motion.div>
  );
};

// This assumets messages are sorted by date already.
function getMessageBuckets(messages: Message[]): Array<Message[]> {
  return messages.reduce(
    (buckets: Array<Message[]>, message: Message) => {
      // If sent isn't set, always add it as it's own bucket
      if (message.sent === undefined) {
        return [...buckets, [message]];
      }

      // We initialize the reducer with [[]] so buckets should always be non-empty.
      const lastBucket = buckets[buckets.length - 1] as Message[];
      if (lastBucket.length === 0) return [[message]];

      // If this is the initial iteration, initialize buckets.
      if (buckets.length === 1 && buckets[0].length === 0) {
        const result: Array<Message[]> = [[message]];
        return result;
      }

      // If the last message in the last bucket is either sent to a different
      // address, undefined, sent is not set on it, or it's older than 5 minutes
      // from the current message, create a new bucket.
      const lastInLastBucket = buckets[buckets.length - 1]?.[0];
      if (lastInLastBucket?.recipientAddress !== message.recipientAddress)
        return [...buckets, [message]];
      if (lastInLastBucket === undefined) return [...buckets, [message]];
      if (lastInLastBucket.sent === undefined) return [...buckets, [message]];
      if (isFiveMinuteDifference(lastInLastBucket.sent, message.sent)) {
        return [...buckets, [message]];
      }

      // If the first message in the last bucket is either undefined, sent is
      // not set on it, or it's older than an hour from the current message,
      // create a new bucket.
      const firstInLastBucket = buckets[buckets.length - 1]?.[0];
      if (firstInLastBucket === undefined) return [...buckets, [message]];
      if (firstInLastBucket.sent === undefined) return [...buckets, [message]];
      if (isHourDifference(firstInLastBucket.sent, message.sent))
        return [...buckets, [message]];

      // If we got here then we just add the current message to the last bucket.
      lastBucket.push(message);
      return buckets;
    },
    // If you change this you might break this function, in particular the line
    // where we assert that the last bucket is type Message[].
    [[]]
  );
}
function isHourDifference(a: Date, b: Date): boolean {
  // 360000 is milliseconds in an hour
  return Math.abs(a.getTime() - b.getTime()) > 3600000;
}

function isFiveMinuteDifference(a: Date, b: Date): boolean {
  // 300000 is milliseconds in 5 minutes
  return Math.abs(a.getTime() - b.getTime()) > 300000;
}