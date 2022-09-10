import React, { FunctionComponent, useState } from 'react';
import { truncateAddress } from '../../../utils/address';
import styled from 'styled-components';
import { Avatar } from '..';
import { useEnsName } from '../../../hooks';

export interface AddressInfoProps {
  peerAddress: string;
}

export const AddressInfo: FunctionComponent<AddressInfoProps> = ({
  peerAddress,
}) => {
  const { data: ensName } = useEnsName({ address: peerAddress });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <Avatar peerAddress={peerAddress} onClick={() => null} />
      <TextContainer>
        <MainText>{ensName || truncateAddress(peerAddress)}</MainText>
        <SubText>{truncateAddress(peerAddress)}</SubText>
        <DropdownMenu>
          <DropDownItem
            onClick={() => navigator.clipboard.writeText(String(peerAddress))}>
            <CopyClipboardIcon />
            Copy Address
          </DropDownItem>
          <DropDownItem>
            <LiLink href={'https://relay.cc/' + peerAddress} target="_blank">
              <GoToRelayIcon />
              Relay
            </LiLink>
          </DropDownItem>
          <DropDownItem>
            <LiLink
              href={'https://etherscan.io/address/' + peerAddress}
              target="_blank">
              <EtherscanIcon />
              Etherscan
            </LiLink>
          </DropDownItem>
        </DropdownMenu>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DropdownMenu = styled.ul`
  &&& {
    display: none;
    flex-direction: column;
    background: white;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 1rem;
    border-radius: 4px;
    opacity: 1;
    transition: opacity 150ms, visibility 150ms;
    padding: 0;
    min-width: max-content;
    z-index: 10000000;
  }
`;

const TextContainer = styled.div`
  &&& {
    margin-left: 1rem;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    :hover ${DropdownMenu} {
      display: flex;
    }
  }
`;

const MainText = styled.div`
  &&& {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
    padding-bottom: 4px;
    color: black;
  }
`;

const SubText = styled.div`
  &&& {
    font-weight: 400;
    font-size: 10px;
    line-height: 1;
  }
`;

const DropDownItem = styled.li`
  &&& {
    color: black;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
    border-bottom: 1px solid #eeeeee;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 15px;

    :hover {
      background-color: #eeeeee;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

const LiLink = styled.a`
  &&& {
    color: black;
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 8px;
  }
`;

const CopyClipboardIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
};

const GoToRelayIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
};

const EtherscanIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
};
