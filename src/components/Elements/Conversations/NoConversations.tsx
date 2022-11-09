import React, { FunctionComponent, useCallback } from 'react';
import { useReceiver } from '../../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { Plus } from '../Icons';
import { InfoCard } from '../InfoCard';
import { RelayIdInput } from '..';
import { Handle, Message } from '../../../domain';

export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const NoConversations: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const onSubmitNewConversation = useCallback(
    (handle: Handle) => {
      dispatch({
        id: 'go to screen',
        screen: { id: 'messages', handle },
      });
    },
    [dispatch]
  );

  return (
    <>
      <ul className="ConversationList List">
        <RelayIdInput
          className="rr-m-10px-mt-4"
          onSubmit={onSubmitNewConversation}
          HintIcon={Plus}
        />
        <ConversationListItem
          onClick={() => {
            dispatch({
              id: 'go to screen',
              screen: {
                id: 'messages',
                handle: '0x45C9a201e2937608905fEF17De9A67f25F9f98E0',
              },
            });
          }}
          key={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
          peerAddress={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
          subtitle={'Welcome! Send your first message...'}
          topMessageTime={new Date()}
        />
      </ul>
      <div style={{ margin: 'auto' }}>
        <InfoCard variant="no conversations" />
      </div>
    </>
  );
};
