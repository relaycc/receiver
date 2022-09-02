import styled from 'styled-components';
import React from 'react';

interface TextBubbleProps {
  message: string;
}

const MessageBubble = ({ message }: TextBubbleProps) => {
  return (
    <TextWrapper>
      <MessageText>{message}</MessageText>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  letter-spacing: normal;
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  hyphens: auto;
  padding-left: 50px;
`;

const MessageText = styled.div`
  letter-spacing: normal;
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: #060028;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  word-break: break-word;
  text-align: start;
  padding-left: 4px;
`;

export default MessageBubble;
