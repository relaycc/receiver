import styled from 'styled-components';
import React from 'react'
import { time } from '../../utls/date'

interface TextBubbleProps {
  message: string;
  sentByMe: boolean;
  messageTime: Date | undefined;
}

const MessageBubble = (props: TextBubbleProps) => {
  return (
    <TextWrapper sentByMe={props.sentByMe}>
      <MessageText sentByMe={props.sentByMe}>{props.message}</MessageText>
      { props.messageTime &&
        <MessageTime sentByMe={props.sentByMe}>{time(props.messageTime)}</MessageTime>
      }
    </TextWrapper>
  );
};

const TextWrapper = styled.div<{ sentByMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  background-color: ${(props) => (props.sentByMe ? '#5A46C6' : '#F7F7F7')};
  border-radius: ${(props) => (props.sentByMe ? '8px 8px 0px 8px' : '8px 8px 8px 0px')};
  hyphens: auto;
`;

const MessageText = styled.div<{ sentByMe: boolean }>`
  color: ${(props) => (props.sentByMe ? 'white' : '#000000')};
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  word-break: break-word;
`;

const MessageTime = styled.div<{ sentByMe: boolean }>`
  color: ${(props) => (props.sentByMe ? 'white' : '#333333')};
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  word-break: break-word;
  padding-top: 5px;
  letter-spacing: 1px;
`;

export default MessageBubble;
