import React from 'react';
import { Conversations as ConversationsHeader } from '../Header';

export const Conversations = () => {
  return (
    <ConversationsHeader
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
  );
};
