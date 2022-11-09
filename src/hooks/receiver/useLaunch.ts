import { useCallback } from 'react';
import { useReceiver, ReceiverScreen } from './useReceiver';
import { isHandle, Handle } from '../../domain';

export const useLaunch = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);

  return useCallback((screenOrHandle?: ReceiverScreen | Handle | null) => {
    if (isHandle(screenOrHandle)) {
      dispatch({
        id: 'go to screen',
        screen: {
          id: 'messages',
          handle: screenOrHandle,
        },
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
