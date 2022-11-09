import React, { FunctionComponent, useRef } from 'react';
import { EthAddress } from '../../../domain';
import { useEnsName, useLensName, useInView } from '../../../hooks';
import { Lens } from './Lens';
import { View } from './View';
import { Ens } from './Ens';

export interface AddressProps {
  address: EthAddress;
  onClick: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export const Address: FunctionComponent<AddressProps> = ({
  address,
  onClick,
  size,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const lens = useLensName({ handle: address, wait: !isInView });
  const ens = useEnsName({ handle: address, wait: !isInView });

  if (lens.isLoading) {
    return (
      <View status="loading" size={size} address={address} onClick={onClick} />
    );
  } else {
    if (lens.data === null || lens.data === undefined) {
      if (ens.isLoading) {
        return (
          <View
            status="loading"
            size={size}
            address={address}
            onClick={onClick}
          />
        );
      } else {
        if (ens.data === null || ens.data === undefined) {
          return (
            <View
              address={address}
              status="none"
              size={size}
              onClick={onClick}
            />
          );
        } else {
          return <Ens name={ens.data} onClick={onClick} size={size} />;
        }
      }
    } else {
      return <Lens name={lens.data} onClick={onClick} size={size} />;
    }
  }
};
