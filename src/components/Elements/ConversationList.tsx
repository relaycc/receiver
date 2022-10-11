import React, { FunctionComponent } from 'react';
import {
  byMostRecentMessage,
  pickPeerAddress,
  useConversationList,
  useRelay,
} from '../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { InfoCard } from './InfoCard';
import { LoadingList } from './LoadingList';

export const ConversationList: FunctionComponent = () => {
  const client = useRelay((state) => state.client);
  const { data, status, fetchStatus } = useConversationList();

  if (client === undefined || client === null) {
    throw new Error('never should have been here');
  } else {
    if (
      fetchStatus === 'fetching' ||
      status === 'loading' ||
      data === undefined
    ) {
      return <LoadingList />;
    } else {
      if (Object.keys(data).length === 0) {
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
            {byMostRecentMessage(data)
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
  }
};
