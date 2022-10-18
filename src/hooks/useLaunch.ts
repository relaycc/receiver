import { useCallback } from 'react';
import { useReceiver } from './useReceiver';

export const useLaunch = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);

  return useCallback((handle?: string | null) => {
    if (typeof handle !== 'string') {
      dispatch({ id: 'go to screen', screen: { id: 'conversations' } });
    } else {
      dispatch({
        id: 'go to screen',
        screen: { id: 'messages', peerAddress: handle },
      });
    }
    setIsOpen(true);
  }, []);
};
