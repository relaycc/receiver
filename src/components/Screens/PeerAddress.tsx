import React, { FunctionComponent } from 'react';
import { Screen } from './Screen';
import { MessageList, MessageInput, InfoCard, LoadingList } from '../Elements';
import {
  useEnsAddress,
  useLensAddress,
  isLensName,
  sendMessage,
  isEthAddress,
  isEnsName,
  useMessages,
  usePeerOnNetwork,
  useClient,
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
  const peerOnNetwork = usePeerOnNetwork({ peerAddress });
  const messages = useMessages({ peerAddress });
  const [, client] = useClient();

  return (
    <Screen
      content={(() => {
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
          if (peerOnNetwork.isLoading || peerOnNetwork.data === false) {
            return <InfoCard variant="no peer" />;
          } else if (messages.isLoading) {
            return (
              <>
                <LoadingList />
                <MessageInput
                  onSendMessage={(message: string) =>
                    client.data &&
                    sendMessage(client.data, peerAddress, message)
                  }
                />
              </>
            );
          } else if (messages.isSuccess && messages.data.length === 0) {
            return (
              <>
                <InfoCard variant="no messages" />
                <MessageInput
                  onSendMessage={(message: string) =>
                    client.data &&
                    sendMessage(client.data, peerAddress, message)
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
                    client.data &&
                    sendMessage(client.data, peerAddress, message)
                  }
                />
              </>
            );
          }
        }
      })()}
    />
  );
};
