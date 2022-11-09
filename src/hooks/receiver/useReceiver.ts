import create from 'zustand';
import { Handle, EthAddress } from '../../domain';

export type Setter<T> = (state: T) => unknown;

export type ReceiverScreen =
  | { id: 'messages'; handle: Handle }
  | { id: 'group'; handle: EthAddress }
  | { id: 'all conversations' }
  | { id: 'pinned conversations' }
  | { id: 'ignored conversations' }
  | { id: 'groups' }
  | { id: 'menu' }
  | { id: 'new conversation' };

export type ReceiverAction =
  | {
      id: 'add pinned conversation';
      peerAddress: EthAddress;
    }
  | {
      id: 'remove pinned conversation';
      peerAddress: EthAddress;
    }
  | {
      id: 'go to screen';
      screen: ReceiverScreen;
    }
  | {
      id: 'go back screen';
    };

export interface ReceiverStore {
  pinnedConversations: EthAddress[];
  setPinnedConversations: Setter<EthAddress[]>;
  isOpen: boolean;
  setIsOpen: Setter<boolean>;
  screenHistory: ReceiverScreen[];
  setScreenHistory: Setter<ReceiverScreen[]>;
  dispatch: (action: ReceiverAction) => unknown;
}

export const useReceiver = create<ReceiverStore>((set, get) => ({
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
  peerAddress: EthAddress
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

export const currentScreen = ({
  screenHistory,
}: Pick<ReceiverStore, 'screenHistory'>) => {
  return screenHistory[screenHistory.length - 1];
};
