import React, { FunctionComponent } from 'react';
import { Handle, isLensName, isEnsName, isEthAddress } from '../../../domain';
import { Lens } from './Lens';
import { Ens } from './Ens';
import { Address } from './Address';
import { Screen } from '../Screen';

export interface MessagesProps {
  handle: Handle;
}

export const Messages: FunctionComponent<MessagesProps> = ({ handle }) => {
  return (
    <Screen
      content={(() => {
        if (isLensName(handle)) {
          return <Lens name={handle} />;
        } else if (isEnsName(handle)) {
          return <Ens name={handle} />;
        } else if (isEthAddress(handle)) {
          return <Address address={handle} />;
        } else {
          throw new Error('Invalid handle');
        }
      })()}
    />
  );
};
