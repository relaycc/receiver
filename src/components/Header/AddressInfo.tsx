import React, { FunctionComponent, useState } from 'react';
import { truncateAddress } from '../../utls/address';
import styled from 'styled-components';
import { Avatar } from '../Receiver/Conversations/Avatar';
import { AddressInfoDropdown } from './AddressInfoDropdown';

export interface AddressInfoProps {
  peerAddress: string;
}

export const AddressInfo: FunctionComponent<AddressInfoProps> = ({
  peerAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Avatar peerAddress={peerAddress} />
      {truncateAddress(peerAddress)}
      <AddressInfoDropdown
        textToCopy={peerAddress}
        relayLink={'https://relay.cc/' + peerAddress}
        etherscanLink={'https://etherscan.io/address/' + peerAddress}
        isOpen={isOpen}
        onClickMenu={() => setIsOpen(!isOpen)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
