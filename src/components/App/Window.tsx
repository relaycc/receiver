import React, { FunctionComponent, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Messages, Conversations, NewConversation } from '../Screens';
import { currentScreen, useReceiver, useRelay } from '../../hooks';
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

export const Window: FunctionComponent = () => {
  const screenHistory = useReceiver((state) => state.screenHistory);
  const visibleScreen = currentScreen({ screenHistory });
  const isOpen = useReceiver((state) => state.isOpen);
  const client = useRelay((state) => state.client);
  const dispatch = useRelay((state) => state.dispatch);

  useEffect(() => {
    if (client !== null) {
      dispatch({ id: 'stream messages' });
    }
  }, [client]);

  const screen = useMemo(() => {
    if (visibleScreen.id === 'conversations') {
      return <Conversations />;
    } else if (visibleScreen.id === 'messages') {
      return <Messages peerAddress={visibleScreen.peerAddress} />;
    } else if (visibleScreen.id === 'new conversation') {
      return <NewConversation />;
    } else {
      throw new Error('Unspported screen: ' + String(screen));
    }
  }, [visibleScreen]);

  return (
    <WagmiConfig client={wagmiClient}>
      <Fixed>
        <Container isOpen={isOpen}>{screen}</Container>
      </Fixed>
    </WagmiConfig>
  );
};

const Container = styled.div<{ isOpen: boolean }>`
  width: 400px;
  height: 500px;
  max-height: ${(p) => (p.isOpen ? '500px' : '0')};
  transition: max-height 0.25s ease-in;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 4px;
`;

const Fixed = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  position: fixed;
  bottom: 0.75rem;
  right: 88px;
`;
