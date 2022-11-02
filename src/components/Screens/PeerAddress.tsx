import React, { FunctionComponent, useCallback, useState } from 'react';
import { Screen } from './Screen';
import { MessageList, MessageInput, InfoCard, LoadingList } from '../Elements';
import {
  useEnsAddress,
  isEthAddress,
  useMessages,
  usePeerOnNetwork,
  useLensProfile,
  addressFromProfile,
  useConfig,
  useXmtp,
} from '../../hooks';

export interface PeerAddressProps {
  handle?: string | null;
}

export const PeerAddress: FunctionComponent<PeerAddressProps> = ({
  handle,
}) => {
  const { address } = useXmtp();
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
  const peerOnNetwork = usePeerOnNetwork({
    peerAddress,
    clientAddress: address,
  });
  const messages = useMessages({ peerAddress, clientAddress: address });
  const [scrollMessageList, setScrollMessageList] = useState<() => unknown>(
    () => null
  );
  const config = useConfig();

  const sendMessage = useCallback(
    (message: string) => {
      if (config === null || address === null || !isEthAddress(peerAddress)) {
        return;
      } else {
        return config.xmtp.client.sendMessage(address, peerAddress, message);
      }
    },
    [config, address, peerAddress]
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
                  onSendMessage={sendMessage}
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
                    onSendMessage={sendMessage}
                  />
                </>
              );
            } else {
              return (
                <>
                  <MessageList
                    clientAddress={address as string}
                    peerAddress={peerAddress}
                    setDoScroll={setScrollMessageList}
                  />
                  <MessageInput
                    onEnterPressed={scrollMessageList}
                    onSendMessage={sendMessage}
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
