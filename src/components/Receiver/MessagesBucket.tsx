import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessageBubble from './MessageBubble';
import Avatar from './Avatar';
import React from 'react'

interface MessagesBucketProps {
  peerAddress: string;
  sentByAddress: string | undefined;
  startDate: Date | undefined;
  messages: Message[];
}

export default function MessagesBucket(props: MessagesBucketProps) {
  const sentByMe = props.sentByAddress !== props.peerAddress;
  if (props.messages.length === 0) return null;

  return (
    <>
      {props.messages.map((message: Message) => {
        return (
          <MessagePosition key={message.id} left={sentByMe}>
            { sentByMe || (<AvatarContainer><Avatar address={props.sentByAddress} /></AvatarContainer>)}
            <MessageBubble
              message={
                message.content
              }
              sentByMe={sentByMe}
            />
            { sentByMe && (<AvatarContainer><Avatar address={props.sentByAddress} /></AvatarContainer>)}
          </MessagePosition>
        );
      })}
    </>
  );
}

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

