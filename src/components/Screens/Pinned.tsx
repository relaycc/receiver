import React from 'react';
import { PinnedConversationList, InfoCard, Header } from '../Elements';
import { useReceiver, useRelay } from '../../hooks';

export const Pinned = () => {
  const client = useRelay((state) => state.client);
  const wallet = useReceiver((state) => state.wallet);
  const signatureStatus = useRelay((state) => state.signatureStatus);

  return (
    <>
      <Header />
      {(() => {
        if (wallet === null) {
          return <InfoCard variant="no wallet" />;
        } else if (signatureStatus === 'waiting') {
          return <InfoCard variant="waiting for signature" />;
        } else if (signatureStatus === 'denied') {
          return <InfoCard variant="signature denied" />;
        } else if (client === null) {
          return <InfoCard variant="no xmtp client" />;
        } else {
          return <PinnedConversationList />;
        }
      })()}
    </>
  );
};
