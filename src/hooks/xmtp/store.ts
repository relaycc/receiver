import { useCallback } from 'react';
import create from 'zustand';
import { Signer } from '@ethersproject/abstract-signer';

export interface XmtpStore {
  wallet: Signer | null;
  address: string | null;
  setState: (state: {
    wallet: Signer | null;
    address: string | null;
  }) => unknown;
}

export const useXmtp = create<XmtpStore>((set) => ({
  wallet: null,
  address: null,
  setState: (state) => set(state),
}));

export const useWallet = (): [
  Signer | null,
  (wallet: Signer | null) => unknown
] => {
  const wallet = useXmtp((state) => state.wallet);
  const setState = useXmtp((state) => state.setState);

  const setWallet = useCallback(
    async (wallet: Signer | null) => {
      if (wallet === null) {
        setState({ wallet: null, address: null });
      } else {
        setState({ wallet, address: await wallet.getAddress() });
      }
    },
    [setState]
  );

  return [wallet, setWallet];
};
