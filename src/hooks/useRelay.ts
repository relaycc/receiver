import { Signer } from '@ethersproject/abstract-signer';
import { Client } from '@xmtp/xmtp-js';
import create from 'zustand';

export interface Relay {
  wallet: Signer | null;
  setWallet: (wallet: Signer | null) => unknown;
  client: Client | null;
  login: (walle: Signer) => unknown;
  logout: () => unknown;
}

export const useRelay = create<Relay>((set) => ({
  wallet: null,
  setWallet: (wallet: Signer | null) => set({ wallet }),
  client: null,
  login: async (wallet: Signer) => {
    const client = await Client.create(wallet, {
      env: 'production',
    });
    set({ client });
  },
  logout: () => set({ client: null }),
}));

export interface MessageStore {}

export const useMessages = create<MessageStore>((set) => {});
