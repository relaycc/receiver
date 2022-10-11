import React, { FunctionComponent, useEffect } from 'react';
import { Avatar } from './Avatar';
import { useResponsiveName, useEnsName, useRelay } from '../../hooks';
import { useReceiver } from '../../hooks';
import { getDisplayDate } from '../../utils/date';
import { useQuery } from '@tanstack/react-query';
import { fetchMostRecentMessage } from '../../utils';

export interface PinnedConversationItem {
  peerAddress: string;
  onLoad: (date: Date) => unknown;
}

export const PinnedConversationListItem: FunctionComponent<
  PinnedConversationItem
> = ({ peerAddress, onLoad }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const client = useRelay((state) => state.client);
  const mostRecentMessage = useQuery({
    queryKey: ['peer address', peerAddress],
    queryFn: () => {
      if (client === null || client === undefined) {
        throw new Error('Fetcher executing before XMTP client ready');
      } else {
        return fetchMostRecentMessage(peerAddress, client);
      }
    },
    enabled: client !== null && client !== undefined,
  });
  const { name } = useEnsName({
    handle: peerAddress,
  });
  const responsiveName = useResponsiveName(name, peerAddress, '');

  useEffect(() => {
    if (mostRecentMessage.status === 'success') {
      if (mostRecentMessage?.data?.message?.sent) {
        onLoad(mostRecentMessage.data.message.sent);
      }
    }
  }, [mostRecentMessage.status]);

  return (
    <li
      className="ConversationListItem ListItem"
      onClick={() =>
        dispatch({
          id: 'go to screen',
          screen: { id: 'messages', peerAddress },
        })
      }>
      <div style={{ marginRight: '10px' }}>
        <Avatar handle={peerAddress} onClick={() => null} />
      </div>
      <div className="ConversationListItem ContentContainer">
        <div className="ConversationListItem TopLineContainer">
          <span className="ConversationListItem Title">{responsiveName}</span>
          <span className="ConversationListItem Time">
            {mostRecentMessage.data?.message?.sent
              ? getDisplayDate(mostRecentMessage.data.message.sent)
              : 'Loading...'}
          </span>
        </div>
        <div className="ConversationListItem Subtitle">
          {mostRecentMessage.data?.message
            ? mostRecentMessage.data?.message?.content
            : 'Loading...'}
        </div>
      </div>
    </li>
  );
};
