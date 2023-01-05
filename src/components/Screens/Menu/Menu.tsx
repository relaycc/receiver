import React, { useState, useCallback } from 'react';
import { InfoCard, Search } from '../../Elements';
import {
  isEnsName,
  isLensName,
  isEthAddress,
  useGoToAllConversations,
  useGoToGroups,
  useGoToPinnedConversations,
  useGoToMessages,
  useWalletAddress,
} from '../../../hooks';
import { Header } from './Header';

export const Menu = () => {
  const walletAddress = useWalletAddress();
  const goToAllConversations = useGoToAllConversations();
  const goToGroups = useGoToGroups();
  const goToPinnedConversations = useGoToPinnedConversations();
  const goToMessages = useGoToMessages();
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
      goToMessages({ handle: newConversationInput });
    }
  }, [newConversationInput]);

  if (walletAddress === null) {
    return (
      <>
        <Header />
        <InfoCard variant="no wallet" />;
      </>
    );
  } else {
    return (
      <>
        <Header />
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
          </nav>
          <InfoCard variant="sign in" />
        </div>
      </>
    );
  }
};
