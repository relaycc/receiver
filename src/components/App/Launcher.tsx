import React from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Avatar } from '../Receiver/Avatar';

export interface LauncherProps {
  onClickConversation: (peerAddress: string) => unknown;
  onClickCloseConversation: (peerAddress: string) => unknown;
  onClickLaunch: () => unknown;
  pinnedConversations: string[];
}

export const Launcher: FunctionComponent<LauncherProps> = ({
  onClickCloseConversation,
  onClickConversation,
  onClickLaunch,
  pinnedConversations,
}) => {
  return (
    <Container>
      <LaunchButton onClick={onClickLaunch}>
        <ChatIcon />
      </LaunchButton>
      {pinnedConversations.map((peerAddress) => (
        <AvatarContainer key={peerAddress}>
          <Avatar
            address={peerAddress}
            onClick={() => onClickConversation(peerAddress)}
          />
          <CloseIcon onClick={() => onClickCloseConversation(peerAddress)} />
        </AvatarContainer>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  &&& {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const AvatarHoverDetails = styled.svg`
  &&& {
    position: absolute;
    right: -5px;
    top: -5px;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    display: none;
    z-index: 100000;
    cursor: pointer;
  }
`;

const AvatarContainer = styled.div`
  &&& {
    position: relative;
    cursor: pointer;
    margin-bottom: 1rem;

    :hover ${AvatarHoverDetails} {
      display: block;
    }
  }
`;

const LaunchButton = styled.button`
  &&& {
    background: white;
    border: none;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.45);
    &:hover {
      cursor: pointer;
    }
  }
`;

const ChatIcon = () => {
  return (
    <svg
      fill="white"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#5203fc"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      />
    </svg>
  );
};

const CloseIcon = ({ onClick }: { onClick: () => unknown }) => {
  return (
    <AvatarHoverDetails
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="black"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      height={'16px'}
      width={'16px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </AvatarHoverDetails>
  );
};
