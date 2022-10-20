import React, { FunctionComponent, useState } from 'react';
import { Screen } from './Screen';
import { MessageList, MessageInput, InfoCard, LoadingList } from '../Elements';
import {
  useEnsAddress,
  sendMessage,
  isEthAddress,
  useMessages,
  usePeerOnNetwork,
  useClient,
  useLensProfile,
  addressFromProfile,
} from '../../hooks';

export interface PeerAddressProps {
  handle?: string | null;
}

export const PeerAddress: FunctionComponent<PeerAddressProps> = ({
  handle,
}) => {
  const lensProfile = useLensProfile({
    handle,
  });
  const lensAddress =
    lensProfile.data !== null &&
    lensProfile.data !== undefined &&
    isEthAddress(addressFromProfile(lensProfile.data))
      ? addressFromProfile(lensProfile.data)
      : undefined;
  const ensAddress = useEnsAddress({
    handle,
  });
  const peerAddress = lensAddress || ensAddress.data || handle;
  const peerOnNetwork = usePeerOnNetwork({ peerAddress });
  const messages = useMessages({ peerAddress });
  const [, client] = useClient();
  const [scrollMessageList, setScrollMessageList] = useState<() => unknown>(
    () => null
  );

  return (
    <Screen
      content={(() => {
        if (!isEthAddress(peerAddress)) {
          if (lensProfile.isLoading || ensAddress.isLoading) {
            return (
              <>
                <LoadingList />
                <MessageInput
                  onEnterPressed={scrollMessageList}
                  onSendMessage={() => null}
                />
              </>
            );
          } else {
            return <InfoCard variant="invalid handle" handle={handle} />;
          }
        } else {
          if (messages.isLoading || peerOnNetwork.isLoading) {
            return (
              <>
                <LoadingList />
                <MessageInput
                  onEnterPressed={scrollMessageList}
                  onSendMessage={(message: string) =>
                    client.data &&
                    sendMessage(client.data, peerAddress, message)
                  }
                />
              </>
            );
          } else if (messages.isSuccess) {
            if (peerOnNetwork.data === false) {
              return <InfoCard variant="no peer" />;
            } else if (messages.data.messages.length === 0) {
              return (
                <>
                  <InfoCard variant="no messages" />
                  <MessageInput
                    onEnterPressed={scrollMessageList}
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
                  <MessageList
                    peerAddress={peerAddress}
                    setDoScroll={setScrollMessageList}
                  />
                  <MessageInput
                    onEnterPressed={scrollMessageList}
                    onSendMessage={(message: string) =>
                      client.data &&
                      sendMessage(client.data, peerAddress, message)
                    }
                  />
                </>
              );
            }
          } else {
            throw new Error('We shouldnt be able to get to this state!');
          }
        }
      })()}
    />
  );
};
