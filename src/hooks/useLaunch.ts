import { useCallback } from 'react';
import { useReceiver } from './useReceiver';
import { ReceiverScreen } from './types';

export const useLaunch = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);

  return useCallback((screenOrHandle?: ReceiverScreen | string | null) => {
    if (typeof screenOrHandle === 'string') {
      dispatch({
        id: 'go to screen',
        screen: { id: 'messages', handle: screenOrHandle },
      });
    } else if (screenOrHandle === null || screenOrHandle === undefined) {
      dispatch({
        id: 'go to screen',
        screen: { id: 'menu' },
      });
    } else {
      dispatch({
        id: 'go to screen',
        screen: screenOrHandle,
      });
    }
    setIsOpen(true);
  }, []);
};
