import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  useReceiver,
  isEnsName,
  isEthAddress,
  isLensName,
  Message,
} from '../../../hooks';
import { Plus } from '../../Elements/Icons';
import { InfoCard } from '../../Elements/InfoCard';

export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const NoIgnoredConversations: FunctionComponent = () => {
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
      <InfoCard variant="no ignored conversations" />
    </>
  );
};
