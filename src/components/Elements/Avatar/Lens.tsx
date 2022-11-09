import React, { FunctionComponent, useRef } from 'react';
import { useInView, useLensAddress, useLensAvatar } from '../../../hooks';
import { LensName } from '../../../domain';
import { View } from './View';

export interface LensProps {
  name: LensName;
  onClick: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export const Lens: FunctionComponent<LensProps> = ({ name, onClick, size }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const address = useLensAddress({ handle: name, wait: !isInView });
  const avatar = useLensAvatar({ handle: name, wait: !isInView });

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
