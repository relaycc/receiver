import React, { FunctionComponent } from 'react';
import {
  useEnsAddress,
  useWalletAddress,
  useMessages,
  usePeerOnNetwork,
} from '../../../hooks';
import { EnsName } from '../../../domain';
import { View } from './View';

export interface EnsProps {
  name: EnsName;
}

export const Ens: FunctionComponent<EnsProps> = ({ name }) => {
  const walletAddress = useWalletAddress();
  const address = useEnsAddress({ handle: name });
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
              throw new Error('Messages > Ens :: got to an unexpected state');
            }
          }
        }
      }
    }
  }
};
