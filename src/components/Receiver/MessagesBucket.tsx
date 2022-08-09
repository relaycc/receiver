import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessageBubble from './MessageBubble';
import Avatar from './Avatar';
import React from 'react'
import { receiverStore } from '../../store';

interface MessagesBucketProps {
  startDate: string;
  messages: Message[];
}

export default function MessagesBucket(props: MessagesBucketProps) {
  const { peerAddress } = receiverStore();

  if (props.messages.length === 0) return null;

  return (
    <>
      {props.messages.map((message: Message) => {
        let sentByMe = message.senderAddress !== peerAddress;
        return (
          <MessagePosition key={message.id} left={sentByMe}>
            { sentByMe || (<AvatarContainer><Avatar address={message.senderAddress} /></AvatarContainer>)}
            <MessageBubble
              message={
                message.content
              }
              messageTime={message.sent}
              sentByMe={sentByMe}
            />
            { sentByMe && (<AvatarContainer><Avatar address={message.senderAddress} /></AvatarContainer>)}
          </MessagePosition>
        );
      })}
      <BucketTimestamp>{props.startDate}</BucketTimestamp>
    </>
  );
}

const BucketTimestamp = styled.div`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #333333;
`;

const MessagePosition = styled.div`
  max-width: 80%;
  display: flex;
  gap: 15px;
  align-self: ${(props: { left: boolean }) =>
    props.left ? 'flex-end' : 'flex-start'};
`;

const AvatarContainer = styled.div`
  align-self: flex-end;
`;

