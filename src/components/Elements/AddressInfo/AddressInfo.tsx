import React, { FunctionComponent, useState } from 'react';
import { Avatar } from '../Avatar';
import { Handle } from '../../../domain';
import { PrimaryId } from './PrimaryId';
import { SecondaryId } from './SecondaryId';

export interface AddressInfoProps {
  handle: Handle;
}

export const AddressInfo: FunctionComponent<AddressInfoProps> = ({
  handle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="AddressInfo Container"
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <Avatar handle={handle} onClick={() => null} />
      <div className="AddressInfo TextContainer">
        <PrimaryId handle={handle} />
        <SecondaryId handle={handle} />
      </div>
    </div>
  );
};
