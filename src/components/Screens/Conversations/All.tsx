import React, { FunctionComponent } from 'react';
import {
  LoadingList,
  InfoCard,
  ThreeColumnHeader,
  GoToConversationsIcon,
  ExitIcon,
} from '../../Elements';
import { ConversationListView } from './ConversationListView';
import { NoConversations } from './NoConversations';
import {
  Conversation,
  useConversations,
  useAllMessagesStream,
  useXmtpClient,
  Message,
  useWorkerQueryClient,
} from '@relaycc/xmtp-hooks';
import { useWalletAddress, useGoToMenu, useSetClosed } from '../../../hooks';

export type AllStates =
  | 'no wallet'
  | 'no xmtp client'
  | 'waiting for signature'
  | 'signature denied'
  | 'loading'
  | 'no conversations'
  | 'ready';

export const All: FunctionComponent = () => {
  const workerQueryClient = useWorkerQueryClient();
  const address = useWalletAddress();
  const client = useXmtpClient({ clientAddress: address });
  const conversations = useConversations({
    clientAddress: address,
    ignoreConversation: (conversation: Conversation) => {
      if (typeof conversation.context?.conversationId === 'string') {
        return !conversation.context.conversationId.startsWith('lens.dev');
      } else {
        return false;
      }
    },
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
        title={'Conversations'}
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
              return <NoConversations />;
            } else if (conversations.isLoading) {
              return <LoadingList />;
            } else if (conversations.data?.length === 0) {
              return <NoConversations />;
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
