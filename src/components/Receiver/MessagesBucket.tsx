import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessageBubble from './MessageBubble';
import Avatar from './Avatar';
import React from 'react'

interface MessagesBucketProps {
  peerAddress: string;
  startDate: string;
  messages: Message[];
}

export default function MessagesBucket(props: MessagesBucketProps) {
  if (props.messages.length === 0) return null;

  return (
    <>
      {props.messages.map((message: Message) => {
        let sentByMe = message.senderAddress !== props.peerAddress;
        return (
          <MessagePosition key={message.id}>
            <AvatarContainer><Avatar address={message.senderAddress} /></AvatarContainer>
            <MessageBubble
              message={
                message.content
              }
              messageTime={message.sent}
              sentByMe={sentByMe}
              senderAddress={message.senderAddress}
              peerAddress={props.peerAddress}
            />
          </MessagePosition>
        );
      })}
      <BucketTimestamp>{props.startDate}</BucketTimestamp>
    </>
  );
}

const BucketTimestamp = styled.div`
  font-family: 'Circular Std', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #333333;
`;

const MessagePosition = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  align-self: flex-start;
`;

const AvatarContainer = styled.div`
`;