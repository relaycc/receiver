import React, { FunctionComponent, useEffect } from 'react';
import { useRelay, isEmpty, useReceiver, isEthAddress } from '../../hooks';
import { Messages as MessagesHeader } from '../Elements/Header';
import { MessageList, MessageInput, InfoCard, LoadingList } from '../Elements';
import { useEnsAddress, useLensAddress } from '../../hooks';

export interface PeerAddressProps {
  handle?: string | null;
}

export const PeerAddress: FunctionComponent<PeerAddressProps> = ({
  handle,
}) => {
  const lensAddress = useLensAddress({ handle });
  const ensAddress = useEnsAddress({ handle });
  const peerAddress =
    lensAddress.address || ensAddress.address || handle || 'TODO';
  const client = useRelay((state) => state.client);
  const dispatch = useRelay((state) => state.dispatch);
  const channels = useRelay((state) => state.channels);
  const channel = channels[peerAddress];
  const statuses = useRelay((state) => state.statuses);
  const wallet = useReceiver((state) => state.wallet);
  const channelStatus = statuses[peerAddress];
  const signatureStatus = useRelay((state) => state.signatureStatus);

  useEffect(() => {
    if (client !== null && isEthAddress(peerAddress)) {
      dispatch({ id: 'load peer address', peerAddress });
    }
  }, [client, peerAddress]);

  return (
    <>
      <MessagesHeader />
      {(() => {
        if (wallet === null) {
          return <InfoCard variant="no wallet" />;
        } else if (channelStatus === 'no peer') {
          return <InfoCard variant="no peer" />;
        } else if (signatureStatus === 'waiting') {
          return <InfoCard variant="waiting for signature" />;
        } else if (signatureStatus === 'denied') {
          return <InfoCard variant="signature denied" />;
        } else if (client === null) {
          return <InfoCard variant="no xmtp client" />;
        } else if (
          channelStatus === 'loadingFull' ||
          channelStatus === undefined
        ) {
          return (
            <>
              <LoadingList />
              <MessageInput
                onSendMessage={(message: string) =>
                  client && client.sendMessage(peerAddress, message)
                }
              />
            </>
          );
        } else if (
          channelStatus === 'loadedFull' &&
          channel &&
          isEmpty(channel)
        ) {
          return (
            <>
              <InfoCard variant="no messages" />
              <MessageInput
                onSendMessage={(message: string) =>
                  client && client.sendMessage(peerAddress, message)
                }
              />
            </>
          );
        } else {
          return (
            <>
              <MessageList peerAddress={peerAddress} />
              <MessageInput
                onSendMessage={(message: string) =>
                  client && client.sendMessage(peerAddress, message)
                }
              />
            </>
          );
        }
      })()}
    </>
  );
};
