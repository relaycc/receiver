import React, { useState, useCallback } from 'react';
import { InfoCard } from './InfoCard';
import { Search } from './Icons';
import { useReceiver, isEnsName, isLensName, isEthAddress } from '../../hooks';

export const Menu = () => {
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

  const goToAllConversations = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'all conversations' } });
  }, [dispatch]);

  const goToPinnedConversations = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'pinned conversations' } });
  }, [dispatch]);

  const goToGroups = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'groups' } });
  }, [dispatch]);

  const goToIgnoredConversations = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'ignored conversations' } });
  }, [dispatch]);

  return (
    <div className="MenuScreen">
      <nav className="ScreenNav">
        <form
          className="NewConversationInputForm OverrideMargin"
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
          <Search
            onClick={onSubmitNewConversation}
            className="NewConversationInput Search"
          />
          {newConversatinInputIsError && (
            <p className="NewConversationInput ErrorMessage">
              Please enter a valid handle...
            </p>
          )}
        </form>
        <div
          onClick={goToPinnedConversations}
          className="ConversationListItem ListItem">
          Pinned
        </div>
        <div onClick={goToGroups} className="ConversationListItem ListItem">
          Groups
        </div>
        <div
          onClick={goToAllConversations}
          className="ConversationListItem ListItem">
          Conversations
        </div>
        <div
          onClick={goToIgnoredConversations}
          className="ConversationListItem ListItem">
          Ignored
        </div>
      </nav>
      <InfoCard variant="sign in" />
    </div>
  );
};
