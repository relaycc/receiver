import React, { FunctionComponent, useMemo, useEffect } from 'react';
import { Message } from '../../domain';
import {
  Pinned,
  Ignored,
  All,
  Menu,
  Groups,
  Group,
  Messages,
} from '../Screens';
import {
  currentScreen,
  receiverContext,
  useConversations,
  useReceiver,
  useConfig,
  useClient,
  useWalletAddress,
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
  const address = useWalletAddress();
  const queryClient = useQueryClient({ context: receiverContext });
  const config = useConfig();
  const client = useClient(address);
  useConversations(address);

  useEffect(() => {
    if (config === null || address === null) {
      return;
    } else {
      if (client.data !== undefined && client.data !== null) {
        const listener = config.xmtp.client.listenToAllMessagesStream(
          address,
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
        return () => {
          listener.then(({ unlisten }) => unlisten());
        };
      }
    }
  }, [client.data, config, address, queryClient]);

  const screen = useMemo(() => {
    if (visibleScreen.id === 'pinned conversations') {
      return <Pinned />;
    } else if (visibleScreen.id === 'all conversations') {
      return <All />;
    } else if (visibleScreen.id === 'groups') {
      return <Groups />;
    } else if (visibleScreen.id === 'ignored conversations') {
      return <Ignored />;
    } else if (visibleScreen.id === 'messages') {
      return <Messages handle={visibleScreen.handle} />;
    } else if (visibleScreen.id === 'group') {
      return <Group peerAddress={visibleScreen.handle} />;
    } else if (visibleScreen.id === 'menu') {
      return <Menu />;
    } else {
      console.warn('You tried to go to an unsupported screen', visibleScreen);
      return <Menu />;
    }
  }, [visibleScreen]);

  return (
    <div className="RelayReceiver">
      <div className={`${className} Window Container`}>{screen}</div>
    </div>
  );
};
