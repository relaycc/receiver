import styled from 'styled-components';
import React from 'react'
import { time } from '../../utls/date'
import { Conversation } from '@xmtp/xmtp-js';

interface ConversationCardProps {
  conversation: Conversation;
}

const ConversationCard = ({conversation}: ConversationCardProps) => {
  return (
    <ConversationCardContainer>
      <div>{conversation.peerAddress}</div>
    </ConversationCardContainer>
  );
};

const ConversationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  background-color: #5A46C6;
  hyphens: auto;
  color: black;
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

export default ConversationCard;
