import styled from 'styled-components';
import React, { FunctionComponent } from 'react';
import { Avatar } from './Avatar';
// import { useMessages, getLastMessage } from '../../../xmtp-react/conversations';
import { useResponsiveName, useEnsName } from '../../hooks';

export interface ConversationListItemProps {
  onClick: () => unknown;
  peerAddress: string;
}

export const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = ({ peerAddress, onClick }) => {
  // const messages = useMessages(peerAddress);
  // const lastMessage = Object.values(messages.messages[0]);
  // const lastMessage = getLastMessage(messages);
  const { data: ensName } = useEnsName({
    address: peerAddress,
  });
  const responsiveName = useResponsiveName(ensName, peerAddress, '');

  return (
    <ListItem onClick={onClick}>
      <Avatar peerAddress={peerAddress} />
      <TextContainer>
        <Title>{responsiveName}</Title>
        <Subtitle>Please Implement Me</Subtitle>
      </TextContainer>
    </ListItem>
  );
};

const ListItem = styled.li`
  &&& {
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
    padding: 15px 10px;
    cursor: pointer;
    width: 100%;
    background-color: transparent;
    transition: background-color 300ms ease-in-out;

    :hover {
      background-color: #eeeeee;
      transition: background-color 300ms ease-in-out;
    }
  }
`;

const TextContainer = styled.div`
  &&& {
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const Title = styled.span`
  &&& {
    font-weight: bold;
    text-align: start;
  }
`;

const Subtitle = styled.span`
  &&& {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
    padding: 2px 0px;
  }
`;
