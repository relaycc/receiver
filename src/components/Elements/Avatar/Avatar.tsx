import React, { FunctionComponent } from 'react';
import { Handle, isEnsName, isEthAddress, isLensName } from '../../../domain';
import { Lens } from './Lens';
import { Ens } from './Ens';
import { Address } from './Address';

export interface AvatarProps {
  handle: Handle;
  onClick: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  handle,
  onClick,
  size,
}) => {
  if (isLensName(handle)) {
    return <Lens name={handle} onClick={onClick} size={size} />;
  } else if (isEnsName(handle)) {
    return <Ens name={handle} onClick={onClick} size={size} />;
  } else if (isEthAddress(handle)) {
    return <Address address={handle} onClick={onClick} size={size} />;
  } else {
    throw new Error('Invalid handle');
  }
};
