import React, { FunctionComponent, useMemo, useEffect } from 'react';
import { PeerAddress, Conversations, NewConversation } from '../Screens';
import {
  currentScreen,
  receiverContext,
  useConversations,
  useReceiver,
  useXmtp,
  Message,
  useConfig,
  useClient,
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
  const queryClient = useQueryClient({ context: receiverContext });
  const config = useConfig();
  const [, clientQuery] = useClient();
  useConversations();

  useEffect(() => {
    if (clientQuery.data?.initialized === true) {
      const listener = config.xmtp.client.listenToAllMessagesStream(
        async (message: Message) => {
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
      );
      // I'm not sure if we want to unlisten on unmount. I think there's a certain
      // tradeoff:
      //   * when streams are streaming messages, queries are never stale
      //   * when streams are not streaming messages, queries are insta-stale
      // Not sure what the right way to handle this is.
      return () => listener.unlisten();
    }
  }, [clientQuery.data]);

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
