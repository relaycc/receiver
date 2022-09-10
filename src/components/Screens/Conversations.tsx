import React, { useEffect } from 'react';
import { Conversations as ConversationsHeader } from '../Elements/Header';
import { ConversationList, InfoCard, LoadingList } from '../Elements';
import { useReceiver, useRelay } from '../../hooks';

export const Conversations = () => {
  const client = useRelay((state) => state.client);
  const dispatch = useRelay((state) => state.dispatch);
  const wallet = useReceiver((state) => state.wallet);
  const statuses = useRelay((state) => state.statuses);
  const channelStatus = statuses.conversationList;
  const signatureStatus = useRelay((state) => state.signatureStatus);

  useEffect(() => {
    if (client !== null) {
      dispatch({ id: 'load conversation list' });
    }
  }, [client]);

  return (
    <>
      <ConversationsHeader />
      {(() => {
        if (wallet === null) {
          return <InfoCard variant="no wallet" />;
        } else if (signatureStatus === 'waiting') {
          return <InfoCard variant="waiting for signature" />;
        } else if (signatureStatus === 'denied') {
          return <InfoCard variant="signature denied" />;
        } else if (client === null) {
          return <InfoCard variant="no xmtp client" />;
        } else if (channelStatus === 'loadingFull') {
          return <LoadingList />;
        } else if (channelStatus === 'loadedFull') {
          return <ConversationList />;
        } else {
          return <LoadingList />;
        }
      })()}
    </>
  );
};
