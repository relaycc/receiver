import { useContext } from 'react';
import { ReceiverContext } from './context';

export const useConfig = () => {
  const context = useContext(ReceiverContext);

  return context?.config;
};
