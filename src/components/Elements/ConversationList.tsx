import React, { FunctionComponent } from 'react';
import { useRelay, byMostRecentMessage, pickPeerAddress } from '../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { InfoCard } from './InfoCard';

export const ConversationList: FunctionComponent = () => {
  const conversationList = useRelay((state) => state.channels.conversationList);
  const client = useRelay((state) => state.client);

  if (client === null || conversationList === undefined) {
    throw new Error('Never should have been here!');
  } else {
    if (Object.keys(conversationList).length === 0) {
      return (
        <>
          <ul className="ConversationList List">
            <ConversationListItem
              key={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
              peerAddress={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
              subtitle={'Welcome! Send your first message...'}
              topMessageTime={new Date()}
            />
          </ul>
          <div style={{ margin: 'auto' }}>
            <InfoCard variant="empty conversation" />
          </div>
        </>
      );
    } else {
      return (
        <ul className="ConversationList List">
          {byMostRecentMessage(conversationList)
            .map((i) => i)
            .reverse()
            .map((message) => (
              <ConversationListItem
                key={pickPeerAddress(client.address, message)}
                peerAddress={pickPeerAddress(client.address, message)}
                subtitle={message.content}
                topMessageTime={message.sent}
              />
            ))}
        </ul>
      );
    }
  }
};
