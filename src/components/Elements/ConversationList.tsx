import styled from 'styled-components';
import React, { FunctionComponent } from 'react';
import { useRelay, byMostRecentMessage, pickPeerAddress } from '../../hooks';
import { ConversationListItem } from './ConversationListItem';

export const ConversationList: FunctionComponent = () => {
  const conversationList = useRelay((state) => state.channels.conversationList);
  const client = useRelay((state) => state.client);

  if (client === null || conversationList === undefined) {
    throw new Error('Never should have been here!');
  } else {
    return (
      <List>
        {byMostRecentMessage(conversationList)
          .map((i) => i)
          .reverse()
          .map((message) => (
            <ConversationListItem
              key={pickPeerAddress(client.address, message)}
              peerAddress={pickPeerAddress(client.address, message)}
              subtitle={message.content}
            />
          ))}
      </List>
    );
  }
};

const List = styled.ul`
  &&& {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0;
    margin: 0;
  }
`;
