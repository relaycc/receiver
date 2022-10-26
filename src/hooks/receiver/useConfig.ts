import { useContext } from 'react';
import { ReceiverContext } from './context';

export const useConfig = () => {
  const context = useContext(ReceiverContext);

  if (context === undefined) {
    throw new Error('useConfig must be used within a ReceiverProvider');
  } else {
    return context.config || null;
  }
};
