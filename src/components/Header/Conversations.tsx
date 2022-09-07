import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { AddressInfo } from './AddressInfo';

export interface ConversationsProps {
  onClickBack: () => unknown;
  onClickMinimize: () => unknown;
  onClickExit: () => unknown;
}

export const Conversations: FunctionComponent<ConversationsProps> = ({
  onClickBack,
  onClickMinimize,
  onClickExit,
}) => {
  return (
    <Header>
      <GoBackIcon onClick={onClickBack} />
      <AddressInfo peerAddress="0xf89773CF7cf0B560BC5003a6963b98152D84A15a" />
      <MinimizeIcon onClick={onClickMinimize} />
      <ExitIcon onClick={onClickExit} />
    </Header>
  );
};

const Header = styled.div`
  &&& {
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    text-align: left;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
    color: black;
    display: flex;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space;
    padding: 0px 10px;
    z-index: 1011;
    background-color: white;
  }
`;

const GoBackIcon = ({ onClick }: { onClick: () => unknown }) => {
  return (
    <svg
      onClick={onClick}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}
      style={{ marginRight: '5px' }}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};

const MinimizeIcon = ({ onClick }: { onClick: () => unknown }) => {
  return (
    <svg
      style={{ marginLeft: 'auto ' }}
      onClick={onClick}
      fill="none"
      viewBox="0 0 28 28"
      strokeWidth={2.5}
      stroke="black"
      height="28"
      width={28}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
};

const ExitIcon = ({ onClick }: { onClick: () => unknown }) => {
  return (
    <svg
      onClick={onClick}
      fill="none"
      viewBox="0 0 28 28"
      strokeWidth={2.5}
      stroke="black"
      height="28"
      width="28">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
