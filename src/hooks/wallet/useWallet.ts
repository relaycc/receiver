import create from 'zustand';
import { Wallet } from '../../domain';

interface WalletStore {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => unknown;
}

const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
}));

export const useWallet = (): [
  Wallet | null,
  (wallet: Wallet | null) => unknown
] => {
  const { wallet, setWallet } = useWalletStore();
  return [wallet, setWallet];
};
