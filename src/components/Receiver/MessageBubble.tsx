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
  background-color: ${(props) => (props.sentByMe ? '#5A46C6' : '#F8F7FF')};
  border-radius: ${(props) => (props.sentByMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px')};
  border: ${(props) => (props.sentByMe ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #FBFBFB')};
  box-shadow: ${(props) => (props.sentByMe ? '0px 0px 4px rgba(0, 0, 0, 0.1)' : '0px 0px 4px rgba(0, 0, 0, 0.1)')};

  hyphens: auto;
`;

const MessageText = styled.div<{ sentByMe: boolean }>`
  color: ${(props) => (props.sentByMe ? '#FFFFFF' : '#060028')};
  font-family: 'Circular Std', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  word-break: break-word;
`;

const MessageTime = styled.div<{ sentByMe: boolean }>`
  color: ${(props) => (props.sentByMe ? '#CFC6FF' : '#4E4773')};
  font-family: 'Circular Std', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  word-break: break-word;
  padding-top: 5px;
  letter-spacing: 1px;
`;

export default MessageBubble;
