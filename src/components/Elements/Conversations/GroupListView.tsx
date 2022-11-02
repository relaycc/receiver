import React, { FunctionComponent, useCallback, useState } from 'react';
import { useReceiver, Message, Group, useGroup } from '../../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { Plus } from '../Icons';
import { LoadingSpinner } from '../LoadingSpinner';

export interface GroupConversation {
  group: Group;
  messages: Message[];
}

export const GroupListView: FunctionComponent<{
  conversations: GroupConversation[];
}> = ({ conversations }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const [newGroupInput, setNewGroupInput] = useState<string | null>(null);
  const [newGroupInputIsError, setNewGroupInputIsError] = useState(false);
  const { create } = useGroup();

  const onSubmitNewGroup = useCallback(() => {
    if (newGroupInput === null) {
      setNewGroupInputIsError(true);
    } else {
      create.mutate({ name: newGroupInput });
    }
  }, [newGroupInput, dispatch]);

  const parseMessage = useCallback((message: Message): Message => {
    try {
      const json = JSON.parse(message.content) as {
        senderAddress: string;
        message: string;
      };
      return {
        id: message.id,
        senderAddress: json.senderAddress,
        recipientAddress: message.recipientAddress,
        content: json.message,
        sent: message.sent,
      };
    } catch {
      return message;
    }
  }, []);

  return (
    <ul className="ConversationList List">
      <li>
        <form
          className="NewConversationInputForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitNewGroup();
          }}>
          <input
            className="NewConversationInput"
            placeholder="Enter new group info..."
            type="text"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="false"
            autoCapitalize="false"
            value={create.isLoading ? 'Creating group...' : newGroupInput || ''}
            onChange={(e) => {
              e.preventDefault();
              setNewGroupInput(e.target.value);
              setNewGroupInputIsError(false);
            }}
          />
          {create.isLoading && (
            <div className="NewConversationInput NewGroupSpinner">
              <LoadingSpinner />
            </div>
          )}
          {create.isLoading || (
            <Plus
              onClick={onSubmitNewGroup}
              className="NewConversationInput Plus"
            />
          )}
          {newGroupInputIsError && (
            <p className="NewConversationInput ErrorMessage">
              {"Group name field can't be empty."}
            </p>
          )}
        </form>
      </li>
      {conversations.map(({ group, messages }) => {
        return (
          <ConversationListItem
            key={group.wallet.wallet.address}
            peerAddress={group.wallet.wallet.address}
            peerAddressDisplay={group.name}
            subtitle={parseMessage(messages[0]).content}
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
