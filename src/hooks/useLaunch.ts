import { useEffect, useCallback } from 'react';
import { Signer } from '@ethersproject/abstract-signer';
import { useReceiver } from './useReceiver';

export const useLaunch = (wallet?: Signer | null) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const setWallet = useReceiver((state) => state.setWallet);

  useEffect(() => {
    if (wallet !== undefined) {
      setWallet(wallet || null);
    }
  }, [wallet, setWallet]);

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
