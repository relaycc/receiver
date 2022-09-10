import React from 'react';
import { Conversations as Header } from '../Elements/Header';
import { NewConversation as Main } from '../Elements';
import { useReceiver } from '../../hooks';

export const NewConversation = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return (
    <>
      <Header />
      <Main
        onClickCreate={(peerAddress: string) => {
          dispatch({
            id: 'go to screen',
            screen: { id: 'messages', peerAddress },
          });
        }}
      />
    </>
  );
};
