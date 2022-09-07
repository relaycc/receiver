import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Launcher } from './Launcher';
import { Window } from './Window';
import { useReceiver } from '../Receiver/ReceiverStore';

export const Root = () => {
  const receiver = useReceiver();

  useEffect(() => {
    receiver.setIsOpen(true);
    receiver.setVisibleScreen('conversations');
  }, []);

  return (
    <Fixed>
      {receiver.isOpen && receiver.visibleScreen !== null && (
        <Window visibleScreen={receiver.visibleScreen} />
      )}
      <Launcher
        pinnedConversations={receiver.pinnedConversations}
        onClickConversation={(peerAddress: string) => {
          receiver.setPinnedConversations([peerAddress]);
        }}
        onClickCloseConversation={(peerAddress: string) => {
          receiver.setPinnedConversations([peerAddress]);
        }}
        onClickLaunch={() => {
          receiver.setIsOpen(true);
        }}
      />
    </Fixed>
  );
};

export const Fixed = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin: 1.5rem;
`;
