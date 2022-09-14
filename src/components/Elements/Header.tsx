import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
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
      <HeaderWrapper>
        <GoToConversationsIcon
          marginRight="8px"
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'conversations' } })
          }
        />
        <Title>New Conversation</Title>
        <ExitIcon
          marginLeft="auto"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </HeaderWrapper>
    );
  } else if (screen.id === 'conversations') {
    return (
      <HeaderWrapper>
        <NewConversationIcon
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'new conversation' } })
          }
          marginRight="8px"
        />
        <Title>Conversations</Title>
        <ExitIcon
          marginLeft="auto"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </HeaderWrapper>
    );
  } else if (screen.id === 'messages') {
    return (
      <HeaderWrapper>
        <GoToConversationsIcon
          marginRight="8px"
          onClick={() =>
            dispatch({ id: 'go to screen', screen: { id: 'conversations' } })
          }
        />
        <AddressInfo handle={screen.peerAddress} />
        <MinimizeIcon
          marginLeft="auto"
          marginRight="8px"
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
      </HeaderWrapper>
    );
  } else {
    throw new Error('Never should have been here!');
  }
};

const HeaderWrapper = styled.div`
  &&& {
    text-align: left;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
    color: black;
    display: flex;
    justify-content: space-between;
    min-height: 62px;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    z-index: 1011;
    background-color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-family: 'Poppins', sans-serif;
  color: black;
  font-weight: 700;
  text-align: bottom;
`;
