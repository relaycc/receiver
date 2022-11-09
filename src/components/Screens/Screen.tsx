import React, { FunctionComponent, ReactNode } from 'react';
import { useClient, useWalletAddress } from '../../hooks';
import { Header, InfoCard } from '../Elements';

export const Screen: FunctionComponent<{ content: ReactNode }> = ({
  content,
}) => {
  const walletAddress = useWalletAddress();
  const client = useClient(walletAddress);

  return (
    <>
      <Header />
      {(() => {
        if (walletAddress === null) {
          return <InfoCard variant="no wallet" />;
        } else if (client.status === 'loading') {
          if (client.fetchStatus === 'idle') {
            return <InfoCard variant="no xmtp client" />;
          } else {
            return <InfoCard variant="waiting for signature" />;
          }
        } else if (client.status === 'error') {
          return <InfoCard variant="signature denied" />;
        } else if (client.data === null) {
          return <InfoCard variant="no xmtp client" />;
        } else {
          return content;
        }
      })()}
    </>
  );
};
