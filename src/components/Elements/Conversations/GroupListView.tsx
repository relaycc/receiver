import React, { FunctionComponent, useCallback } from 'react';
import { useReceiver, useGroup } from '../../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { Plus } from '../Icons';
import { RelayGroupNameInput } from '../RelayGroupNameInput';
import { Group, Message, getText } from '../../../domain';

export interface GroupConversation {
  group: Group;
  messages: Message[];
}

export const GroupListView: FunctionComponent<{
  conversations: GroupConversation[];
}> = ({ conversations }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const { create } = useGroup();

  const onSubmitNewGroup = useCallback(
    (name: string) => {
      create.mutate({ name });
    },
    [create]
  );

  return (
    <ul className="ConversationList List">
      <li>
        <RelayGroupNameInput
          className="rr-m-10px-mt-4"
          onSubmit={onSubmitNewGroup}
          HintIcon={Plus}
          onSubmitIsRunning={create.isLoading}
          onSubmitIsSuccess={create.isSuccess}
        />
      </li>
      {conversations.map(({ group, messages }) => {
        return (
          <ConversationListItem
            key={group.wallet.wallet.address}
            peerAddress={group.wallet.wallet.address}
            peerAddressDisplay={group.name}
            subtitle={getText(messages[0])}
            topMessageTime={messages[0].sent as Date}
            onClick={() => {
              dispatch({
                id: 'go to screen',
                screen: {
                  id: 'group',
                  handle: group.wallet.wallet.address,
                },
              });
            }}
          />
        );
      })}
    </ul>
  );
};
