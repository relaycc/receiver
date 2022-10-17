import React, { FunctionComponent, useCallback } from 'react';
import { currentScreen, useReceiver } from '../../hooks';
import { AddressInfo } from './AddressInfo';
import {
  GoToConversationsIcon,
  ExitIcon,
  NewConversationIcon,
  MinimizeIcon,
} from './MenuIcons';

export const Header: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const screenHistory = useReceiver((state) => state.screenHistory);
  const screen = currentScreen({ screenHistory });

  const doClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const goToConversations = useCallback(() => {
    console.time('Clicked dispatch');
    console.time('Dispatch to first render');
    dispatch({ id: 'go to screen', screen: { id: 'conversations' } });
    console.timeEnd('Clicked dispatch');
  }, [dispatch]);

  const goToNewConversations = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'new conversation' } });
  }, [dispatch]);

  if (screen.id === 'new conversation') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToConversations} />
        <h1 className="Header Title">New Conversation</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'conversations') {
    return (
      <div className="Header HeaderWrapper">
        <NewConversationIcon onClick={goToNewConversations} />
        <h1 className="Header Title">Conversations</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'pinned') {
    return (
      <div className="Header HeaderWrapper">
        <NewConversationIcon onClick={goToNewConversations} />
        <h1 className="Header Title">Pinned</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'messages') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon marginRight="10px" onClick={goToConversations} />
        <AddressInfo handle={screen.peerAddress} />
        <MinimizeIcon
          marginLeft="auto"
          onClick={() => {
            dispatch({
              id: 'add pinned conversation',
              peerAddress: screen.peerAddress,
            });
            doClose();
          }}
        />
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else {
    throw new Error('Never should have been here!');
  }
};
