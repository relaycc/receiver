import { useState, useEffect } from 'react';
import { conversationsListDate } from '../utils';

export const useResponsiveTime = (date: Date) => {
  const [conversationTime, setConversationTime] = useState('string');

  useEffect(() => {
    const latestTime = conversationsListDate(date);
    setConversationTime(latestTime);
  }, [date]);

  return conversationTime;
};
