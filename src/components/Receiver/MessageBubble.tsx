import styled from 'styled-components';
import React from 'react'

interface TextBubbleProps {
  message: string;
  sentByMe: boolean;
}

const MessageBubble = (props: TextBubbleProps) => {
  return (
    <TextWrapper sentByMe={props.sentByMe}>
      <MessageText sentByMe={props.sentByMe}>{props.message}</MessageText>
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

const MessageText = styled.p<{ sentByMe: boolean }>`
  color: ${(props) => (props.sentByMe ? 'white' : '#333333')};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  word-break: break-word;
`;

export default MessageBubble;
