import React, { useCallback } from 'react';
import { InfoCard } from './InfoCard';
import { RelayIdInput } from './RelayIdInput';
import { Search } from './Icons';
import { useReceiver } from '../../hooks';
import { Handle } from '../../domain';

export const Menu = () => {
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
        <RelayIdInput HintIcon={Search} onSubmit={onSubmitNewConversation} />
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
