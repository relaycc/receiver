import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { currentScreen, useReceiver } from '../../../hooks';
import { AddressInfo } from './AddressInfo';

export const Messages: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const screenHistory = useReceiver((state) => state.screenHistory);
  const { peerAddress } = currentScreen({ screenHistory }) as {
    peerAddress: string;
  };

  return (
    <Header>
      <GoBackIcon onClick={() => dispatch({ id: 'go back screen' })} />
      <AddressInfo handle={peerAddress} />
      <MinimizeIcon
        onClick={() => {
          setIsOpen(false);
          dispatch({ id: 'add pinned conversation', peerAddress });
        }}
      />
      <ExitIcon
        onClick={() => {
          setIsOpen(false);
          dispatch({ id: 'remove pinned conversation', peerAddress });
        }}
      />
    </Header>
  );
};

const Header = styled.div`
  &&& {
    text-align: left;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
    color: black;
    display: flex;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space;
    padding: 0.5rem;
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
      style={{ marginRight: '5px', cursor: 'pointer' }}>
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
      style={{ marginLeft: 'auto', cursor: 'pointer' }}
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
      style={{ cursor: 'pointer ' }}
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
