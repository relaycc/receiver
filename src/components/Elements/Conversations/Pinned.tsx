import React, { FunctionComponent, useMemo } from 'react';
import {
  useConversationsPreviews,
  usePinnedAddresses,
  useWalletAddress,
} from '../../../hooks';
import { ConversationListView, Conversation } from './ConversationListView';
import { LoadingList } from '../LoadingList';
import { NoPinnedConversations } from './NoPinnedConversations';

export const Pinned: FunctionComponent = () => {
  const walletAddress = useWalletAddress();
  const pinnedAddresses = usePinnedAddresses(walletAddress);
  const pinnedPreviews = useConversationsPreviews(
    pinnedAddresses.data?.addresses || [],
    walletAddress
  );
  const pinnedIsLoading =
    pinnedAddresses.isLoading ||
    Boolean(pinnedPreviews.find((pq) => pq.isLoading));

  const conversationsProps: Conversation[] = useMemo(() => {
    return pinnedPreviews
      .filter((cp) => cp.data && cp.data.messages.length > 0)
      .map((cp) => cp.data)
      .sort((a, b) => {
        if (a === undefined) return 1;
        if (b === undefined) return -1;
        if (a.messages[0] === undefined) return 1;
        if (b.messages[0] === undefined) return -1;
        if (a.messages[0].sent === undefined) return 1;
        if (b.messages[0].sent === undefined) return 1;
        return a.messages[0].sent.getTime() < b.messages[0].sent.getTime()
          ? 1
          : -1;
      }) as Conversation[];
  }, [pinnedPreviews]);

  if (pinnedIsLoading) {
    return <LoadingList />;
  } else if (conversationsProps.length === 0) {
    return <NoPinnedConversations />;
  } else {
    return <ConversationListView conversations={conversationsProps} />;
  }
};
