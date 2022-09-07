import React from 'react';
import { Conversations as Header } from '../Header';
import { NewConversation as Main } from '../Elements';

export const NewConversation = () => {
  return (
    <>
      <Header
        onClickBack={function () {
          console.log('clicked back');
        }}
        onClickMinimize={function () {
          console.log('clicked min');
        }}
        onClickExit={function () {
          console.log('clicked min');
        }}
      />
      <Main
        onClickCreate={(peerAddress: string) => {
          console.log(peerAddress);
        }}
      />
    </>
  );
};
