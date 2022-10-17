import React, { FunctionComponent, useRef, useEffect } from 'react';
import { useRelay, Message, byMostRecentMessage } from '../../hooks';
import MessagesBucket from '../Elements/MessagesBucket';

export interface MessageListProps {
  peerAddress: string;
  isEnterPressed: boolean;
}

export const MessageList: FunctionComponent<MessageListProps> = ({
  peerAddress,
  isEnterPressed,
}) => {
  const client = useRelay((state) => state.client);
  const channels = useRelay((state) => state.channels);
  const channel = channels[peerAddress];

  const bottomDiv: any = useRef();

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

  if (channel !== undefined && client !== null) {
    const buckets = getMessageBuckets(
      byMostRecentMessage(channel)
        .map((i) => i)
        .reverse()
    );

    return (
      <div className="MessageList List">
        <div ref={bottomDiv}></div>
        {buckets.map((bucket, index) => {
          if (bucket.length > 0) {
            return (
              <MessagesBucket
                key={index}
                messages={bucket}
                userPeerAddress={client.address}
                startDate={bucket[bucket.length - 1].sent}
                peerName={peerAddress}
                sentByAddress={bucket[0].senderAddress}
              />
            );
          }
          return null;
        })}
      </div>
    );
  } else {
    return null;
  }
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
