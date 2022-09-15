import React from 'react';
import { NewConversation as Main, Header } from '../Elements';
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
