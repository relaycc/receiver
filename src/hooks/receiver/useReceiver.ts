import create from 'zustand';
import { useCallback, useState, useEffect } from 'react';
import { ReceiverAction, Setter, ReceiverScreen } from '../types';
import { Signer } from '@ethersproject/abstract-signer';
import { EthAddress, isEthAddress } from '@relaycc/xmtp-hooks';

export interface ReceiverStore {
  wallet: Signer | null;
  setWallet: Setter<Signer | null>;
  pinnedConversations: string[];
  setPinnedConversations: Setter<string[]>;
  isOpen: boolean;
  setIsOpen: Setter<boolean>;
  screenHistory: ReceiverScreen[];
  setScreenHistory: Setter<ReceiverScreen[]>;
  dispatch: (action: ReceiverAction) => unknown;
}

export const useReceiver = create<ReceiverStore>((set, get) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
  pinnedConversations: [],
  setPinnedConversations: (pinnedConversations) => set({ pinnedConversations }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  screenHistory: [{ id: 'menu' }],
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

export const useWallet = (): [
  wallet: Signer | null,
  setWallet: (wallet: Signer | null) => void
] => {
  const wallet = useReceiver((state) => state.wallet);
  const setWallet = useReceiver((state) => state.setWallet);
  return [wallet, setWallet];
};

export const useWalletAddress = (): EthAddress | null => {
  const [wallet] = useWallet();
  const [address, setAddress] = useState<EthAddress | null>(null);

  useEffect(() => {
    if (wallet === null) {
      setAddress(null);
    } else {
      wallet.getAddress().then((address) => {
        if (!isEthAddress(address)) {
          console.warn(
            'useWalletAddress: invalid address, not an EthAddress',
            address
          );
          throw new Error(
            'useWalletAddress :: wallet address is not an EthAddress'
          );
        } else {
          setAddress(address);
        }
      });
    }
  }, [wallet]);

  return address;
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
  if (sameScreen(state.screenHistory[state.screenHistory.length - 1], screen)) {
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
    return screenA.handle === screenB.handle;
  } else {
    return screenA.id === screenB.id;
  }
};

export const useCurrentScreen = () => {
  const screenHistory = useReceiver((state) => state.screenHistory);
  return screenHistory[screenHistory.length - 1];
};

export const useDmHandle = () => {
  const currentScreen = useCurrentScreen();
  if (currentScreen.id !== 'messages') {
    return null;
  } else {
    return currentScreen.handle;
  }
};

export const useGoToMenu = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'menu' } });
  }, [dispatch]);
};

export const useSetClosed = () => {
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  return useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
};

export const useGoToAllConversations = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(() => {
    return dispatch({
      id: 'go to screen',
      screen: { id: 'all conversations' },
    });
  }, [dispatch]);
};

export const useGoToPinnedConversations = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(() => {
    return dispatch({
      id: 'go to screen',
      screen: { id: 'pinned conversations' },
    });
  }, [dispatch]);
};

export const useGoToGroups = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(() => {
    return dispatch({ id: 'go to screen', screen: { id: 'groups' } });
  }, [dispatch]);
};

export const useGoToMessages = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(
    ({ handle }: { handle: string }) => {
      return dispatch({
        id: 'go to screen',
        screen: { id: 'messages', handle },
      });
    },
    [dispatch]
  );
};

export const useGoBack = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(() => {
    return dispatch({
      id: 'go back screen',
    });
  }, [dispatch]);
};

export const usePinConversation = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return useCallback(
    ({ peerAddress }: { peerAddress: string }) => {
      return dispatch({
        id: 'add pinned conversation',
        peerAddress,
      });
    },
    [dispatch]
  );
};
