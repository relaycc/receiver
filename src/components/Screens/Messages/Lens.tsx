import React, { FunctionComponent } from 'react';
import {
  useLensAddress,
  useWalletAddress,
  useMessages,
  usePeerOnNetwork,
} from '../../../hooks';
import { LensName } from '../../../domain';
import { View } from './View';

export interface LensProps {
  name: LensName;
}

export const Lens: FunctionComponent<LensProps> = ({ name }) => {
  const walletAddress = useWalletAddress();
  const address = useLensAddress({ handle: name });
  const peerOnNetwork = usePeerOnNetwork({
    peerAddress: address.data,
    clientAddress: walletAddress,
  });
  const messages = useMessages({
    peerAddress: address.data,
    clientAddress: walletAddress,
  });

  if (address.isLoading) {
    return <View status="loading peer" />;
  } else {
    if (address.data === null || address.data === undefined) {
      return <View status="invalid handle" handle={name} />;
    } else {
      if (peerOnNetwork.isLoading) {
        return <View status="loading peer" />;
      } else {
        if (
          peerOnNetwork.data === null ||
          peerOnNetwork.data === undefined ||
          peerOnNetwork.data === false
        ) {
          return <View status="no peer" />;
        }
        if (messages.isLoading) {
          return <View status="loading messages" />;
        } else {
          if (
            messages.data !== null &&
            messages.data !== undefined &&
            messages.data.messages.length === 0
          ) {
            return <View status="no messages" />;
          } else {
            if (walletAddress !== null) {
              return (
                <View
                  status="messages"
                  peerAddress={address.data}
                  walletAddress={walletAddress}
                />
              );
            } else {
              throw new Error('Messages > Lens :: got to an unexpected state');
            }
          }
        }
      }
    }
  }
};
