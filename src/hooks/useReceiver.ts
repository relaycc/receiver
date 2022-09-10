import create from 'zustand';
import { useCallback } from 'react';
import { Signer } from '@ethersproject/abstract-signer';
import { ReceiverAction, ReceiverStore, ReceiverScreen } from './types';

export const useReceiver = create<ReceiverStore>((set, get) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
  pinnedConversations: [],
  setPinnedConversations: (pinnedConversations) => set({ pinnedConversations }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  screenHistory: [{ id: 'conversations' }],
  setScreenHistory: (screenHistory) => set({ screenHistory }),
  dispatch: (action: ReceiverAction) => {
    switch (action.id) {
      case 'add pinned conversation':
        handleAddPinnedConversation(get(), action.peerAddress);
        break;
      case 'remove pinned conversation':
        handleRemovePinnedConversation(get(), action.peerAddress);
        break;
      case 'go to screen':
        handleGoToScreen(get(), action.screen);
        break;
      case 'go back screen':
        handleGoBackScreen(get());
        break;
      default:
        throw new Error('Never should have got here!');
    }
  },
}));

export const useLaunch = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);

  return useCallback((peerAddress?: string) => {
    const action: ReceiverAction = peerAddress
      ? { id: 'go to screen', screen: { id: 'messages', peerAddress } }
      : { id: 'go to screen', screen: { id: 'conversations' } };
    dispatch(action);
    setIsOpen(true);
  }, []);
};

export const useSetWallet = () => {
  const setWallet = useReceiver((state) => state.setWallet);

  return useCallback((wallet: Signer | null) => {
    setWallet(wallet);
  }, []);
};

export const useIsOpen = () => {
  return useReceiver((state) => state.isOpen);
};

const handleGoBackScreen = (state: ReceiverStore) => {
  if (state.screenHistory.length === 1) {
    return;
  } else {
    state.setScreenHistory(
      state.screenHistory.slice(0, state.screenHistory.length - 1)
    );
  }
};

const handleGoToScreen = (state: ReceiverStore, screen: ReceiverScreen) => {
  if (sameScreen(currentScreen(state), screen)) {
    return;
  } else {
    state.setScreenHistory([...state.screenHistory, screen]);
  }
};

const handleRemovePinnedConversation = (
  state: ReceiverStore,
  peerAddress: string
) => {
  state.setPinnedConversations(
    state.pinnedConversations.filter((p) => p !== peerAddress)
  );
};

const handleAddPinnedConversation = (
  state: ReceiverStore,
  peerAddress: string
) => {
  for (const pinnedConversation of state.pinnedConversations) {
    if (pinnedConversation === peerAddress) return;
  }
  state.setPinnedConversations([...state.pinnedConversations, peerAddress]);
};

export const sameScreen = (
  screenA: ReceiverScreen,
  screenB: ReceiverScreen
) => {
  if (screenA.id === 'messages' && screenB.id === 'messages') {
    return screenA.peerAddress === screenB.peerAddress;
  } else {
    return screenA.id === screenB.id;
  }
};

export const currentScreen = ({
  screenHistory,
}: Pick<ReceiverStore, 'screenHistory'>) => {
  return screenHistory[screenHistory.length - 1];
};
