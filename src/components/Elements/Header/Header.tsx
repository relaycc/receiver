import React, { FunctionComponent, useCallback } from 'react';
import { currentScreen, useReceiver } from '../../../hooks';
import { GoToConversationsIcon, ExitIcon } from '../MenuIcons';
import { MenuScreenHeader } from './MenuScreenHeader';
import { GroupScreenHeader } from './GroupScreenHeader';
import { MessagesScreenHeader } from './MessagesScreenHeader';

export const Header: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const screenHistory = useReceiver((state) => state.screenHistory);
  const screen = currentScreen({ screenHistory });

  const doClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const goToMenu = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'menu' } });
  }, [dispatch]);

  if (screen.id === 'all conversations') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">All Conversations</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'pinned conversations') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">Pinned</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'groups') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">Groups</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'ignored conversations') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">Ignored</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'menu') {
    return <MenuScreenHeader />;
  } else if (screen.id === 'messages') {
    return <MessagesScreenHeader handle={screen.handle} />;
  } else if (screen.id === 'group') {
    return <GroupScreenHeader address={screen.handle} />;
  } else {
    throw new Error('Never should have been here!');
  }
};
