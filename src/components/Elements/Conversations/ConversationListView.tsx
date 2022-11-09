import React, { FunctionComponent, useCallback } from 'react';
import { useReceiver } from '../../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { Plus } from '../Icons';
import { RelayIdInput } from '..';
import { Message, EthAddress, getText, Handle } from '../../../domain';

export interface Conversation {
  peerAddress: EthAddress;
  messages: Message[];
}

export const ConversationListView: FunctionComponent<{
  conversations: Conversation[];
}> = ({ conversations }) => {
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
    <ul className="ConversationList List">
      <li>
        <RelayIdInput
          className="rr-m-10px-mt-4"
          onSubmit={onSubmitNewConversation}
          HintIcon={Plus}
        />
      </li>
      {conversations.map(({ peerAddress, messages }) => {
        return (
          <ConversationListItem
            key={peerAddress}
            peerAddress={peerAddress}
            subtitle={getText(messages[0])}
            topMessageTime={messages[0].sent as Date}
            onClick={() => {
              dispatch({
                id: 'go to screen',
                screen: {
                  id: 'messages',
                  handle: peerAddress,
                },
              });
            }}
          />
        );
      })}
    </ul>
  );
};
