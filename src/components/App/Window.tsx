import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { PeerAddress, Conversations, NewConversation } from '../Screens';
import { currentScreen, useReceiver, useRelay } from '../../hooks';
<<<<<<< HEAD
import '../../styles/app.css'
=======
import '../../styles/app.css';
>>>>>>> 50829dc0f667d63dc00cb57cd06bef45b1264926

export interface WindowProps {
  className?: string;
}

export const Window: FunctionComponent<WindowProps> = ({ className }) => {
  const screenHistory = useReceiver((state) => state.screenHistory);
  const visibleScreen = currentScreen({ screenHistory });
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

  return <div className={`${className} Window Container`}>{screen}</div>;
};
