import styled from 'styled-components';
import React from 'react';
import { useEnsName } from 'wagmi';
import { useMessages, getLastMessage } from '../../../xmtp-react/conversations';
import Avatar from '../Avatar';
import { useResponsiveName } from '../../../hooks/useResponsiveName';

interface ConversationProps {
  peerAddress: string;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setPeerAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function Conversation({
  peerAddress,
  setShowConversations,
  setPeerAddress,
}: ConversationProps) {
  const messages = useMessages(peerAddress);
  const lastMessage = getLastMessage(messages);
  const { data: ensName, isLoading } = useEnsName({
    address: peerAddress,
  });
  const responsiveName = useResponsiveName(ensName, peerAddress, '');

  const handleClick = () => {
    setShowConversations(false);
    setPeerAddress(peerAddress);
  };

  return (
    <ListItem onClick={handleClick}>
      <Avatar address={peerAddress} />
      <TextContainer>
        <Title>{responsiveName}</Title>
        <Subtitle>{lastMessage?.content}</Subtitle>
      </TextContainer>
    </ListItem>
  );
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
  padding: 17px 10px;
  cursor: pointer;
  width: 100%;
  background-color: transparent;
  transition: background-color 300ms ease-in-out;

  :hover {
    background-color: #eeeeee;
    transition: background-color 300ms ease-in-out;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 1rem;
`;

const Title = styled.span`
  font-weight: bold;
  text-align: start;
`;

const Subtitle = styled.span`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  padding: 2px 0px;
`;
