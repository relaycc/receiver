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
import { InfoCard } from '../InfoCard';

export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const NoConversations: FunctionComponent = () => {
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
    <>
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
      <ul className="ConversationList List">
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
