import React, { FunctionComponent } from 'react';
import {
  useWalletAddress,
  useMessages,
  usePeerOnNetwork,
} from '../../../hooks';
import { EthAddress } from '../../../domain';
import { View } from './View';

export interface AddressProps {
  address: EthAddress;
}

export const Address: FunctionComponent<AddressProps> = ({ address }) => {
  const walletAddress = useWalletAddress();
  const peerOnNetwork = usePeerOnNetwork({
    peerAddress: address,
    clientAddress: walletAddress,
  });
  const messages = useMessages({
    peerAddress: address,
    clientAddress: walletAddress,
  });

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
              peerAddress={address}
              walletAddress={walletAddress}
            />
          );
        } else {
          throw new Error('Messages > Address :: got to an unexpected state');
        }
      }
    }
  }
};
