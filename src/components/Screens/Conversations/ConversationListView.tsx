import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  useReceiver,
  isEnsName,
  isEthAddress,
  isLensName,
} from '../../../hooks';
import { Plus } from '../../Elements/Icons';
import { Conversation, EthAddress } from '@relaycc/xmtp-hooks';
import { ConversationListItemV2 } from './ConversationListItemV2';

export const ConversationListView: FunctionComponent<{
  clientAddress?: EthAddress | null;
  conversations: Conversation[];
}> = ({ conversations, clientAddress }) => {
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
      {conversations.map((conversation) => {
        return (
          <ConversationListItemV2
            key={
              conversation.peerAddress + conversation.context?.conversationId
            }
            conversation={conversation}
            clientAddress={clientAddress}
            onClick={() => {
              dispatch({
                id: 'go to screen',
                screen: {
                  id: 'messages',
                  handle: conversation,
                },
              });
            }}
          />
        );
      })}
    </ul>
  );
};
