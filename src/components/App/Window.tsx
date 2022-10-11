import React, { FunctionComponent, useEffect, useMemo } from 'react';
import {
  PeerAddress,
  Conversations,
  NewConversation,
  Pinned,
} from '../Screens';
import { currentScreen, useReceiver } from '../../hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../styles/preflight.css';
import '../../styles/app.css';

const queryClient = new QueryClient();

export interface WindowProps {
  className?: string;
}

export const Window: FunctionComponent<WindowProps> = ({ className }) => {
  const screenHistory = useReceiver((state) => state.screenHistory);
  const visibleScreen = currentScreen({ screenHistory });

  const screen = useMemo(() => {
    if (visibleScreen.id === 'conversations') {
      return <Conversations />;
    } else if (visibleScreen.id === 'messages') {
      return <PeerAddress handle={visibleScreen.peerAddress} />;
    } else if (visibleScreen.id === 'pinned') {
      return <Pinned />;
    } else if (visibleScreen.id === 'new conversation') {
      return <NewConversation />;
    } else {
      throw new Error('Unspported screen: ' + String(screen));
    }
  }, [visibleScreen]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="RelayReceiver">
        <div className={`${className} Window Container`}>{screen}</div>
      </div>
    </QueryClientProvider>
  );
};
