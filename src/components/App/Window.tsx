import React, { FunctionComponent, useMemo, useEffect } from 'react';
import { PeerAddress, Conversations, NewConversation } from '../Screens';
import {
  currentScreen,
  receiverContext,
  useAllMessagesStream,
  useConversations,
  useReceiver,
  useXmtp,
} from '../../hooks';
import '../../styles/preflight.css';
import '../../styles/app.css';
import { useQueryClient } from '@tanstack/react-query';

export interface WindowProps {
  className?: string;
}

export const Window: FunctionComponent<WindowProps> = ({ className }) => {
  const screenHistory = useReceiver((state) => state.screenHistory);
  const visibleScreen = currentScreen({ screenHistory });
  const address = useXmtp((state) => state.address);
  const messagesStream = useAllMessagesStream();
  const queryClient = useQueryClient({ context: receiverContext });
  useConversations();

  useEffect(() => {
    (async () => {
      if (messagesStream.data === undefined || address === null) {
        return;
      } else {
        for await (const message of messagesStream.data) {
          queryClient.invalidateQueries(['conversations list', address]);
          queryClient.invalidateQueries([
            'messages',
            address,
            message.senderAddress,
          ]);
          queryClient.invalidateQueries([
            'messages',
            address,
            message.recipientAddress,
          ]);
        }
      }
    })();
  }, [messagesStream.data, address]);

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
    <div className="RelayReceiver">
      <div className={`${className} Window Container`}>{screen}</div>
    </div>
  );
};
