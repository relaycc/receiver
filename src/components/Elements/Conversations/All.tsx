import React, { FunctionComponent, useMemo } from 'react';
import {
  useConversations,
  useConversationsPreviews,
  Message,
  useIgnoredAddresses,
  PINNED_ADDRESS,
  IGNORED_ADDRESS,
  useXmtp,
  GROUPS_ADDRESS,
} from '../../../hooks';
import { LoadingList } from '../LoadingList';
import { ConversationListView } from './ConversationListView';
import { NoConversations } from './NoConversations';

interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const All: FunctionComponent = () => {
  const address = useXmtp((state) => state.address);
  const conversations = useConversations(address);
  const ignoredAddresses = useIgnoredAddresses(address);
  const conversationsPreviews = useConversationsPreviews(
    conversations.data ? conversations.data.map((c) => c.peerAddress) : [],
    address
  );

  const isLoading =
    ignoredAddresses.isLoading ||
    conversations.isLoading ||
    Boolean(conversationsPreviews.find((cp) => cp.isLoading));

  const conversationsProps: Conversation[] = useMemo(() => {
    return conversationsPreviews
      .filter((cp) => {
        if (cp.data === undefined) return false;
        if (cp.data.messages.length === 0) return false;
        if (ignoredAddresses.data?.includes(cp.data.peerAddress)) return false;
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
      }) as Conversation[];
  }, [conversationsPreviews]);

  if (isLoading) {
    return <LoadingList />;
  } else if (conversationsProps.length === 0) {
    return <NoConversations />;
  } else {
    return <ConversationListView conversations={conversationsProps} />;
  }
};
