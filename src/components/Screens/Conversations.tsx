import React from 'react';
import { ConversationList } from '../Elements';
import { Screen } from './Screen';

export const Conversations = () => {
  return <Screen content={<ConversationList />} />;
};
