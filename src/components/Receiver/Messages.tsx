import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessagesBucket from './MessagesBucket';
import LoadingMessages from './LoadingMessages';
import { Status, useXmtp } from '../../xmtp-react/context';
import React, { useEffect } from 'react';
import { useMessages } from '../../xmtp-react/conversations';
import Card from './Card';
import Button from './Button';

interface MessagesProps {
  peerAddress?: string;
  peerName?: string;
  peerIsAvailable: boolean | undefined;
  setPeerIsAvailable: (peerIsAvailable: boolean) => unknown;
  onXmptReady: (isReady: boolean) => unknown;
}

export const Messages = ({
  peerAddress,
  peerName,
  onXmptReady,
  peerIsAvailable,
  setPeerIsAvailable,
}: MessagesProps) => {
  return null;
};

export default Messages;
//   const xmtp = useXmtp();
//   const messages = useMessages(peerAddress);
//   const messageArray = Object.values(messages).reverse();
//   const buckets = getMessageBuckets(messageArray);

//   useEffect(() => {
//     if (xmtp.status === Status.ready && peerAddress) {
//       const effect = async () => {
//         const peerIsAvailable = await xmtp.client.canMessage(peerAddress);
//         onXmptReady(peerIsAvailable);
//         setPeerIsAvailable(peerIsAvailable);
//       };
//       effect();
//     }
//   });

//   if (typeof peerAddress !== 'string') {
//     return (
//       <Card title="Could not resolve ENS name">
//         <Text>{'Make sure to include the ".eth" suffix.'}</Text>
//       </Card>
//     );
//   } else if (peerIsAvailable === false) {
//     return (
//       <Card title="User not on network">
//         <Text>This user is not on the XMTP messaging network yet.</Text>
//       </Card>
//     );
//   } else if (xmtp.status === Status.idle) {
//     return (
//       <Card title="Initialize XMTP Client">
//         <Text>
//           To begin messaging, you must first initialize the XMTP client.
//         </Text>
//         <Button onClick={xmtp.init} text="Initialize" />
//       </Card>
//     );
//   } else if (xmtp.status === Status.waiting) {
//     return (
//       <Card title="Initialize XMTP Client">
//         <Text>
//           <b>Initializing.</b>
//         </Text>
//         <Text>To continue, please sign the wallet prompt.</Text>
//       </Card>
//     );
//   } else if (xmtp.status === Status.denied) {
//     return (
//       <Card title="Initialize XMTP Client">
//         <Text>
//           <b>Initializing.</b>
//         </Text>
//         <Text>Signature request cancelled. Try again...</Text>
//         <Button onClick={xmtp.init} text="Initialize" />
//       </Card>
//     );
//   } else if (xmtp.status === Status.loading) {
//     return <LoadingMessages />;
//   } else if (xmtp.status === Status.ready && peerIsAvailable === true) {
//     if (Object.values(messages).length > 0) {
//       return (
//         <List>
//           {buckets.map((bucket, index) => {
//             if (bucket.length > 0) {
//               return (
//                 <MessagesBucket
//                   key={index}
//                   messages={bucket}
//                   peerAddress={peerAddress}
//                   startDate={bucket[bucket.length - 1].sent}
//                   peerName={peerName}
//                   sentByAddress={bucket[0].senderAddress}
//                 />
//               );
//             }
//             return null;
//           })}
//         </List>
//       );
//     } else {
//       return (
//         <Card title="All Set  🎉">
//           <Text>{`This is the beginning of your encrypted conversation with ${peerName}`}</Text>
//         </Card>
//       );
//     }
//   } else {
//     return <></>;
//   }
// };

// const List = styled.div`
//   &&& {
//     display: flex;
//     flex-direction: column-reverse;
//     overflow: scroll;
//     gap: 0.75rem;
//     width: 100%;
//     height: 100%;
//     z-index: 10;
//     padding: 0px 10px;
//     box-sizing: border-box;
//   }
// `;

// const Text = styled.div`
//   &&& {
//     font-family: 'Poppins', sans-serif;
//     font-style: normal;
//     font-weight: 500;
//     font-size: 12px;
//     line-height: 18px;
//     color: #2d2d2d;
//   }
// `;

// // This assumets messages are sorted by date already.
// function getMessageBuckets(messages: Message[]): Array<Message[]> {
//   return messages.reduce(
//     (buckets: Array<Message[]>, message: Message) => {
//       // If sent isn't set, always add it as it's own bucket
//       if (message.sent === undefined) {
//         return [...buckets, [message]];
//       }

//       // We initialize the reducer with [[]] so buckets should always be non-empty.
//       const lastBucket = buckets[buckets.length - 1] as Message[];
//       if (lastBucket.length === 0) return [[message]];

//       // If this is the initial iteration, initialize buckets.
//       if (buckets.length === 1 && buckets[0].length === 0) {
//         const result: Array<Message[]> = [[message]];
//         return result;
//       }

//       // If the last message in the last bucket is either sent to a different
//       // address, undefined, sent is not set on it, or it's older than 5 minutes
//       // from the current message, create a new bucket.
//       const lastInLastBucket = buckets[buckets.length - 1]?.[0];
//       if (lastInLastBucket?.recipientAddress !== message.recipientAddress)
//         return [...buckets, [message]];
//       if (lastInLastBucket === undefined) return [...buckets, [message]];
//       if (lastInLastBucket.sent === undefined) return [...buckets, [message]];
//       if (isFiveMinuteDifference(lastInLastBucket.sent, message.sent)) {
//         return [...buckets, [message]];
//       }

//       // If the first message in the last bucket is either undefined, sent is
//       // not set on it, or it's older than an hour from the current message,
//       // create a new bucket.
//       const firstInLastBucket = buckets[buckets.length - 1]?.[0];
//       if (firstInLastBucket === undefined) return [...buckets, [message]];
//       if (firstInLastBucket.sent === undefined) return [...buckets, [message]];
//       if (isHourDifference(firstInLastBucket.sent, message.sent))
//         return [...buckets, [message]];

//       // If we got here then we just add the current message to the last bucket.
//       lastBucket.push(message);
//       return buckets;
//     },
//     // If you change this you might break this function, in particular the line
//     // where we assert that the last bucket is type Message[].
//     [[]]
//   );
// }
// function isHourDifference(a: Date, b: Date): boolean {
//   // 360000 is milliseconds in an hour
//   return Math.abs(a.getTime() - b.getTime()) > 3600000;
// }

// function isFiveMinuteDifference(a: Date, b: Date): boolean {
//   // 300000 is milliseconds in 5 minutes
//   return Math.abs(a.getTime() - b.getTime()) > 300000;
// }

// export default Messages;
