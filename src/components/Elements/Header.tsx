import React, { FunctionComponent } from 'react';
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

  if (screen.id === 'new conversation') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'conversations' } })
          }
        />
        <h1 className="Header Title">New Conversation</h1>
        <ExitIcon
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    );
  } else if (screen.id === 'conversations') {
    return (
      <div className="Header HeaderWrapper">
        <NewConversationIcon
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'new conversation' } })
          }
        />
        <h1 className="Header Title">Conversations</h1>
        <ExitIcon
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    );
  } else if (screen.id === 'pinned') {
    return (
      <div className="Header HeaderWrapper">
        <NewConversationIcon
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'new conversation' } })
          }
        />
        <h1 className="Header Title">Pinned</h1>
        <ExitIcon
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    );
  } else if (screen.id === 'messages') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon
          marginRight="10px"
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'conversations' } })
          }
        />
        <AddressInfo handle={screen.peerAddress} />
        <MinimizeIcon
          marginLeft="auto"
          onClick={() => {
            dispatch({
              id: 'add pinned conversation',
              peerAddress: screen.peerAddress,
            });
            setIsOpen(false);
          }}
        />
        <ExitIcon
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    );
  } else {
    throw new Error('Never should have been here!');
  }
};
