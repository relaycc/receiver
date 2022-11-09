import React, { FunctionComponent, useMemo } from 'react';
import {
  useConversations,
  useConversationsPreviews,
  useIgnoredAddresses,
  useWalletAddress,
} from '../../../hooks';
import { LoadingList } from '../LoadingList';
import { ConversationListView } from './ConversationListView';
import { NoConversations } from './NoConversations';
import {
  GROUPS_ADDRESS,
  PINNED_ADDRESS,
  IGNORED_ADDRESS,
  isIgnoredAddresses,
  EthAddress,
  Message,
} from '../../../domain';

interface ConversationWithMessages {
  peerAddress: EthAddress;
  messages: Message[];
}

export const All: FunctionComponent = () => {
  const walletAddress = useWalletAddress();
  const conversations = useConversations(walletAddress);
  const ignoredAddresses = useIgnoredAddresses(walletAddress);
  const conversationsPreviews = useConversationsPreviews(
    (() => {
      if (conversations.data === undefined) {
        return [];
      } else {
        return conversations.data.map((c) => c.peerAddress);
      }
    })(),
    walletAddress
  );

  const isLoading =
    ignoredAddresses.isLoading ||
    conversations.isLoading ||
    Boolean(conversationsPreviews.find((cp) => cp.isLoading));

  const conversationsProps: ConversationWithMessages[] = useMemo(() => {
    return conversationsPreviews
      .filter((cp) => {
        if (cp.data === undefined) return false;
        if (cp.data.messages.length === 0) return false;
        if (isIgnoredAddresses(ignoredAddresses.data)) {
          return ignoredAddresses.data.addresses.includes(cp.data.peerAddress);
        }
        if (cp.data.peerAddress === PINNED_ADDRESS) return false;
        if (cp.data.peerAddress === IGNORED_ADDRESS) return false;
        if (cp.data.peerAddress === GROUPS_ADDRESS) return false;
        return true;
      })
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
      }) as ConversationWithMessages[];
  }, [conversationsPreviews]);

  if (isLoading) {
    return <LoadingList />;
  } else if (conversationsProps.length === 0) {
    return <NoConversations />;
  } else {
    return <ConversationListView conversations={conversationsProps} />;
  }
};
