import React, { FunctionComponent, useRef } from 'react';
import { useInView, useEnsAvatar, useEnsAddress } from '../../../hooks';
import { EnsName } from '../../../domain';
import { View } from './View';

export interface EnsProps {
  name: EnsName;
  onClick: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export const Ens: FunctionComponent<EnsProps> = ({ name, onClick, size }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const address = useEnsAddress({ handle: name, wait: !isInView });
  const avatar = useEnsAvatar({
    handle: name,
    wait: isInView === false,
  });

  if (avatar.data === null || avatar.data === undefined) {
    if (address.data === null || address.data === undefined) {
      return <View status="fallback" size={size} onClick={onClick} />;
    } else {
      if (avatar.isLoading) {
        return (
          <View
            status="loading"
            size={size}
            address={address.data}
            onClick={onClick}
          />
        );
      } else {
        return (
          <View
            status="none"
            size={size}
            address={address.data}
            onClick={onClick}
          />
        );
      }
    }
  } else {
    return (
      <View status="ready" size={size} avatar={avatar.data} onClick={onClick} />
    );
  }
};
