import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  useReceiver,
  isEnsName,
  isEthAddress,
  isLensName,
  Message,
} from '../../../hooks';
import { ConversationListItem } from './ConversationListItem';
import { Plus } from '../Icons';

export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const ConversationListView: FunctionComponent<{
  conversations: Conversation[];
}> = ({ conversations }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const [newConversationInput, setNewConversationInput] = useState<
    string | null
  >(null);
  const [newConversatinInputIsError, setNewConversationInputIsError] =
    useState(false);

  const onSubmitNewConversation = useCallback(() => {
    if (
      newConversationInput === null ||
      (!isEnsName(newConversationInput) &&
        !isEthAddress(newConversationInput) &&
        !isLensName(newConversationInput))
    ) {
      setNewConversationInputIsError(true);
    } else {
      dispatch({
        id: 'go to screen',
        screen: { id: 'messages', handle: newConversationInput },
      });
    }
  }, [newConversationInput, dispatch]);

  return (
    <ul className="ConversationList List">
      <li>
        <form
          className="NewConversationInputForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitNewConversation();
          }}>
          <input
            className="NewConversationInput"
            autoFocus={true}
            placeholder="Enter ENS, Lens, or address..."
            type="text"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="false"
            autoCapitalize="false"
            value={newConversationInput || ''}
            onChange={(e) => {
              e.preventDefault();
              setNewConversationInput(e.target.value);
              setNewConversationInputIsError(false);
            }}
          />
          <Plus
            onClick={onSubmitNewConversation}
            className="NewConversationInput Plus"
          />
          {newConversatinInputIsError && (
            <p className="NewConversationInput ErrorMessage">
              Please enter a valid handle...
            </p>
          )}
        </form>
      </li>
      {conversations.map(({ peerAddress, messages }) => {
        return (
          <ConversationListItem
            key={peerAddress}
            peerAddress={peerAddress}
            subtitle={messages[0].content}
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
