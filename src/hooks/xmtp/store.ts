import { useCallback } from 'react';
import create from 'zustand';
import { WorkerWallet } from '../types';

export interface XmtpStore {
  wallet: WorkerWallet | null;
  address: string | null;
  setState: (state: {
    wallet: WorkerWallet | null;
    address: string | null;
  }) => unknown;
}

export const useXmtp = create<XmtpStore>((set) => ({
  wallet: null,
  address: null,
  setState: (state) => set(state),
}));

export const useWallet = (): [
  WorkerWallet | null,
  (wallet: WorkerWallet | null) => unknown
] => {
  const wallet = useXmtp((state) => state.wallet);
  const setState = useXmtp((state) => state.setState);

  const setWallet = useCallback(
    async (wallet: WorkerWallet | null) => {
      if (wallet === null) {
        setState({ wallet: null, address: null });
      } else {
        setState({
          wallet,
          address:
            wallet.id === 'identity wallet'
              ? wallet.wallet.address
              : await wallet.wallet.getAddress(),
        });
      }
    },
    [setState]
  );

  return [wallet, setWallet];
};
