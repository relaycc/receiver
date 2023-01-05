// import React, { FunctionComponent, useState, useCallback } from 'react';
// import { Screen } from './Screen';
// import { MessageList, MessageInput, InfoCard, LoadingList } from '../Elements';
// import {
//   useMessages,
//   useConfig,
//   useClient,
//   Message,
//   sendGroupMessage,
//   useXmtp,
// } from '../../hooks';

// export interface GroupProps {
//   peerAddress: string;
// }

// export const Group: FunctionComponent<GroupProps> = ({ peerAddress }) => {
//   const address = useXmtp((state) => state.address);
//   const groupClient = useClient(peerAddress);
//   const messages = useMessages({
//     clientAddress: peerAddress,
//     peerAddress,
//   });
//   const [scrollMessageList, setScrollMessageList] = useState<() => unknown>(
//     () => null
//   );
//   const config = useConfig();

//   const sendMessage = useCallback(
//     (message: string) => {
//       if (config === null || address === null) {
//         return;
//       } else {
//         return sendGroupMessage(
//           address,
//           peerAddress,
//           config.xmtp.client,
//           message
//         );
//       }
//     },
//     [config, peerAddress]
//   );

//   const parseMessage = useCallback((message: Message): Message => {
//     try {
//       const json = JSON.parse(message.content) as {
//         senderAddress: string;
//         message: string;
//       };
//       return {
//         id: message.id,
//         senderAddress: json.senderAddress,
//         recipientAddress: message.recipientAddress,
//         content: json.message,
//         sent: message.sent,
//       };
//     } catch {
//       return message;
//     }
//   }, []);

//   return (
//     <Screen
//       content={(() => {
//         if (messages.isLoading || groupClient.isLoading) {
//           return (
//             <>
//               <LoadingList />
//               <MessageInput
//                 onEnterPressed={scrollMessageList}
//                 onSendMessage={() => null}
//               />
//             </>
//           );
//         } else if (messages.isSuccess) {
//           if (messages.data.messages.length === 0) {
//             return (
//               <>
//                 <InfoCard variant="no messages" />
//                 <MessageInput
//                   onEnterPressed={scrollMessageList}
//                   onSendMessage={sendMessage}
//                 />
//               </>
//             );
//           } else {
//             return (
//               <>
//                 <MessageList
//                   clientAddress={peerAddress}
//                   peerAddress={peerAddress}
//                   setDoScroll={setScrollMessageList}
//                   parseMessage={parseMessage}
//                 />
//                 <MessageInput
//                   onEnterPressed={scrollMessageList}
//                   onSendMessage={sendMessage}
//                 />
//               </>
//             );
//           }
//         } else {
//           throw new Error('We shouldnt be able to get to this state!');
//         }
//       })()}
//     />
//   );
// };

export const GroupChat = () => null;
