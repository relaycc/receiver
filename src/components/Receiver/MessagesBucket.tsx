import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessageBubble from './MessageBubble';
import Avatar from './Avatar';
import React from 'react'
interface MessagesBucketProps {
  peerAddress: string;
  startDate: string;
  messages: Message[];
  peerName?: string | undefined;
}

export default function MessagesBucket(props: MessagesBucketProps) {
  if (props.messages.length === 0) return null;
 
  return (
    <Container>
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
              peerName={props.peerName}
            />
          </MessagePosition>
        );
      })}
      <BucketTimestamp>{props.startDate}</BucketTimestamp>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 15px;
`

const BucketTimestamp = styled.div`
  font-family: 'Roboto', sans-serif;
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