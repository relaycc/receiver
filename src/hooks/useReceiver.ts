import create from 'zustand';
import { Signer } from '@ethersproject/abstract-signer';

export type Screen = 'messages' | 'conversations' | 'new' | 'xmtp';

export interface ReceiverStore {
  wallet: Signer | null;
  setWallet: (wallet: Signer | null) => unknown;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  pinnedConversations: string[];
  setPinnedConversations: (pinnedConversation: string[]) => unknown;
  visibleScreen: Screen | null;
  setVisibleScreen: (screen: Screen | null) => unknown;
}

export const useReceiver = create<ReceiverStore>((set) => ({
  wallet: null,
  setWallet: (wallet: Signer | null) => set({ wallet }),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  pinnedConversations: [],
  setPinnedConversations: (pinnedConversations) => set({ pinnedConversations }),
  visibleScreen: null,
  setVisibleScreen: (screen: Screen | null) => set({ visibleScreen: screen }),
}));

export const removePinnedConversation = (
  toRemove: string,
  pinnedConversations: string[]
) => {
  return pinnedConversations.filter(
    (pinnedConversation) => pinnedConversation !== toRemove
  );
};

export const addPinnedConversation = (
  toAdd: string,
  pinnedConversations: string[]
) => {
  return [...pinnedConversations, toAdd];
};
