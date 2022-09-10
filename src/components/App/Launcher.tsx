import React, { useEffect } from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useReceiver, useRelay } from '../../hooks';
import { Avatar } from '../Elements';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi';

const alchemyKey = 'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx';

const { provider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyKey }),
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors: [],
  provider,
});

export interface LauncherProps {
  peerAddress?: string;
}

export const Launcher: FunctionComponent<LauncherProps> = ({ peerAddress }) => {
  const client = useRelay((state) => state.client);
  const dispatchRelay = useRelay((state) => state.dispatch);
  const pinnedConversations = useReceiver((state) => state.pinnedConversations);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const isOpen = useReceiver((state) => state.isOpen);
  const dispatchReceiver = useReceiver((state) => state.dispatch);

  const onClickLaunch = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (peerAddress) {
        dispatchReceiver({
          id: 'go to screen',
          screen: { id: 'messages', peerAddress },
        });
      } else {
        dispatchReceiver({
          id: 'go to screen',
          screen: { id: 'conversations' },
        });
      }
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (client !== null) {
      dispatchRelay({ id: 'stream messages' });
    }
  }, [client]);

  return (
    <WagmiConfig client={wagmiClient}>
      <Fixed>
        <Container>
          <LaunchButton onClick={onClickLaunch}>
            <ChatIcon />
          </LaunchButton>
          {pinnedConversations.map((peerAddress) => (
            <AvatarContainer key={peerAddress}>
              <Avatar
                large={true}
                peerAddress={peerAddress}
                onClick={() => {
                  dispatchReceiver({
                    id: 'go to screen',
                    screen: { id: 'messages', peerAddress },
                  });
                  setIsOpen(true);
                }}
              />
              <AvatarHoverDetails
                onClick={() => {
                  dispatchReceiver({
                    id: 'remove pinned conversation',
                    peerAddress,
                  });
                }}>
                <CloseIcon />
              </AvatarHoverDetails>
            </AvatarContainer>
          ))}
        </Container>
      </Fixed>
    </WagmiConfig>
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

const AvatarHoverDetails = styled.div`
  &&& {
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const AvatarContainer = styled.div`
  &&& {
    position: relative;
    cursor: pointer;
    margin-bottom: 0.75rem;

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
    height: 3rem;
    width: 3rem;
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

const Fixed = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin: 1.5rem;
`;

const CloseIcon = () => {
  return (
    <svg
      fill="black"
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
