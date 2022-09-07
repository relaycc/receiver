import styled from 'styled-components';
import React, { FunctionComponent } from 'react';
import { useConversations } from '../../xmtp-react/conversations';
import { Avatar } from './Avatar';

export interface ConversationsProps {
  onClickConversation: (peerAddress: string) => unknown;
}

export const Conversations: FunctionComponent<ConversationsProps> = ({
  onClickConversation,
}) => {
  const conversations = useConversations();

  return (
    <List>
      {conversations.map((peerAddress) => (
        <ListItem
          key={peerAddress}
          onClick={() => onClickConversation(peerAddress)}>
          <Avatar peerAddress={peerAddress} />
          <TextContainer>
            <Title>{peerAddress}</Title>
            <Subtitle>Please Implement Me</Subtitle>
          </TextContainer>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  &&& {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: scroll;
  }
`;

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
