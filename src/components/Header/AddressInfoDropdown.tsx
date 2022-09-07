import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface AddressInfoDropdownProps {
  textToCopy: string;
  relayLink: string;
  etherscanLink: string;
  isOpen: boolean;
  onClickMenu: () => unknown;
}

export const AddressInfoDropdown: FunctionComponent<
  AddressInfoDropdownProps
> = ({ textToCopy, relayLink, etherscanLink, isOpen, onClickMenu }) => {
  return (
    <RelativeContainer>
      <VerticalDotIcon onClick={onClickMenu} />
      {isOpen && (
        <DropdownMenu>
          <DropDownItem
            onClick={() => navigator.clipboard.writeText(String(textToCopy))}>
            <CopyClipboardIcon />
            Copy Address
          </DropDownItem>
          <DropDownItem>
            <LiLink href={relayLink} target="_blank">
              <GoToRelayIcon />
              Relay
            </LiLink>
          </DropDownItem>
          <DropDownItem>
            <LiLink href={etherscanLink} target="_blank">
              <EtherscanIcon />
              Etherscan
            </LiLink>
          </DropDownItem>
        </DropdownMenu>
      )}
    </RelativeContainer>
  );
};

const RelativeContainer = styled.div`
  &&& {
    position: relative;
  }
`;

const DropdownMenu = styled.ul`
  &&& {
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 20px;
    border-radius: 4px;
    transition: opacity 150ms, visibility 150ms;
    padding: 0;
    min-width: max-content;
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

const VerticalDotIcon = ({ onClick }: { onClick: () => unknown }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      />
    </svg>
  );
};
