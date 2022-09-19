import React, { FunctionComponent, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { PeerAddress, Conversations, NewConversation } from '../Screens';
import { currentScreen, useReceiver, useRelay } from '../../hooks';

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
      return <PeerAddress handle={visibleScreen.peerAddress} />;
    } else if (visibleScreen.id === 'new conversation') {
      return <NewConversation />;
    } else {
      throw new Error('Unspported screen: ' + String(screen));
    }
  }, [visibleScreen]);

  return (
    <Fixed>
      <Container isOpen={isOpen}>{screen}</Container>
    </Fixed>
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
  position: fixed;
  bottom: 0;
  right: 88px;
`;
