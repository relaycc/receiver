import React, { FunctionComponent, useEffect } from 'react';
import {
  MessageList,
  MessageInput,
  InfoCard,
  LoadingList,
  Header,
} from '../Elements';
import {
  useEnsAddress,
  useLensAddress,
  isLensName,
  useRelay,
  useReceiver,
  isEmpty,
  isEthAddress,
  isEnsName,
} from '../../hooks';

export interface PeerAddressProps {
  handle?: string | null;
}

export const PeerAddress: FunctionComponent<PeerAddressProps> = ({
  handle,
}) => {
  const lensAddress = useLensAddress({
    handle: isLensName(handle) ? handle : null,
  });
  const ensAddress = useEnsAddress({
    handle: isEnsName(handle) ? handle : null,
  });
  const peerAddress = lensAddress.address || ensAddress.address || handle;

  const client = useRelay((state) => state.client);
  const dispatch = useRelay((state) => state.dispatch);
  const channels = useRelay((state) => state.channels);
  const channel = isEthAddress(peerAddress) ? channels[peerAddress] : undefined;
  const statuses = useRelay((state) => state.statuses);
  const wallet = useReceiver((state) => state.wallet);
  const channelStatus = isEthAddress(peerAddress)
    ? statuses[peerAddress]
    : undefined;
  const signatureStatus = useRelay((state) => state.signatureStatus);

  useEffect(() => {
    if (client !== null && isEthAddress(peerAddress)) {
      dispatch({ id: 'load peer address', peerAddress });
    }
  }, [client, peerAddress]);

  return (
    <>
      <Header />
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
        } else {
          if (!isEthAddress(peerAddress)) {
            if (
              lensAddress.status === 'fetching' ||
              ensAddress.status === 'fetching'
            ) {
              return (
                <>
                  <LoadingList />
                  <MessageInput onSendMessage={() => null} />
                </>
              );
            } else {
              return <InfoCard variant="invalid handle" handle={handle} />;
            }
          } else {
            if (channelStatus === 'loadingFull') {
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
          }
        }
      })()}
    </>
  );
};
