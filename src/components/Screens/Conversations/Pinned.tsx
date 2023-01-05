import React, { FunctionComponent } from 'react';
import {
  LoadingList,
  InfoCard,
  ThreeColumnHeader,
  GoToConversationsIcon,
  ExitIcon,
} from '../../Elements';
import { ConversationListView } from './ConversationListView';
import { NoPinned } from './NoPinned';
import {
  useAllMessagesStream,
  useXmtpClient,
  Message,
  useWorkerQueryClient,
  usePinnedConversations,
} from '@relaycc/xmtp-hooks';
import { useWalletAddress, useGoToMenu, useSetClosed } from '../../../hooks';

export type PinnedStates =
  | 'no wallet'
  | 'no xmtp client'
  | 'waiting for signature'
  | 'signature denied'
  | 'loading'
  | 'no conversations'
  | 'ready';

export const Pinned: FunctionComponent = () => {
  const workerQueryClient = useWorkerQueryClient();
  const address = useWalletAddress();
  const client = useXmtpClient({ clientAddress: address });
  const conversations = usePinnedConversations({
    clientAddress: address,
  });
  const goToMenu = useGoToMenu();
  const setClosed = useSetClosed();

  useAllMessagesStream({
    clientAddress: address,
    listener: (message: Message) => {
      workerQueryClient.refetchQueries({
        queryKey: [
          'messages',
          client.data?.address(),
          message.conversation.peerAddress,
          message.conversation.context?.conversationId,
        ],
      });
    },
  });

  return (
    <>
      <ThreeColumnHeader
        leftIcon={<GoToConversationsIcon onClick={goToMenu} />}
        rightIcon={<ExitIcon onClick={setClosed} />}
        title={'Pinned'}
      />
      {(() => {
        if (address === null) {
          return <InfoCard variant="no wallet" />;
        } else {
          if (client.status === 'loading') {
            if (client.fetchStatus === 'idle') {
              return <InfoCard variant="no xmtp client" />;
            } else {
              return <InfoCard variant="waiting for signature" />;
            }
          } else if (client.status === 'error') {
            return <InfoCard variant="signature denied" />;
          } else if (client.data === null) {
            return <InfoCard variant="no xmtp client" />;
          } else {
            if (conversations.isWaiting) {
              return <NoPinned />;
            } else if (conversations.isLoading) {
              return <LoadingList />;
            } else if (conversations.data?.length === 0) {
              return <NoPinned />;
            } else {
              if (
                conversations.data === null ||
                conversations.data === undefined
              ) {
                throw new Error(
                  'All.tsx :: conversations.data is null or undefined in the happy path!'
                );
              } else {
                return (
                  <ConversationListView
                    clientAddress={address}
                    conversations={conversations.data}
                  />
                );
              }
            }
          }
        }
      })()}
    </>
  );
};
