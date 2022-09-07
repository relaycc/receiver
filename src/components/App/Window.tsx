import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Messages, Conversations, NewConversation } from '../Screens';

export interface WindowProps {
  visibleScreen: 'conversations' | 'new' | 'messages' | 'xmtp';
}

export const Window: FunctionComponent<WindowProps> = ({ visibleScreen }) => {
  const pickScreen = () => {
    if (visibleScreen === 'conversations') {
      return <Conversations />;
    } else if (visibleScreen === 'messages') {
      return <Messages />;
    } else if (visibleScreen === 'xmtp') {
      return <Xmtp />;
    } else if (visibleScreen === 'new') {
      return <NewConversation />;
    } else {
      throw new Error('Unspported screen: ' + String(screen));
    }
  };

  return <Container>{pickScreen()}</Container>;
};

const Xmtp = () => null;

const Container = styled.div`
  margin-right: 1.5rem;
  width: 400px;
  height: 500px;
  background-color: white;
`;
