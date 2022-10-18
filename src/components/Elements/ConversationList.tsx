import React, { FunctionComponent, useMemo } from 'react';
import {
  useConversations,
  useConversationsPreviews,
  usePinnedAddresses,
} from '../../hooks';
import { Message } from '@relaycc/xmtp-js';
import { ConversationListItem } from './ConversationListItem';
import { InfoCard } from './InfoCard';
import { LoadingList } from './LoadingList';
import { LoadingText } from './LoadingText';

interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const ConversationList: FunctionComponent = () => {
  const pinnedAddresses = usePinnedAddresses();
  const conversations = useConversations();
  if (conversations.data !== undefined) {
    logPinnableConversations(conversations.data.map((c) => c.peerAddress));
  }

  const pinnedPreviews = useConversationsPreviews(pinnedAddresses.data || []);
  const listedPreviews = useConversationsPreviews(
    conversations.data ? conversations.data.map((c) => c.peerAddress) : []
  );

  const pinnedIsLoading =
    pinnedAddresses.isLoading ||
    Boolean(pinnedPreviews.find((pq) => pq.isLoading));

  const isLoading =
    conversations.isLoading ||
    Boolean(listedPreviews.find((lq) => lq.isLoading));

  const conversationsProps: Conversation[] = useMemo(() => {
    const dataToProcess = (() => {
      if (isLoading === false) {
        return listedPreviews;
      } else if (pinnedIsLoading === false) {
        return pinnedPreviews;
      } else {
        return [];
      }
    })();

    return dataToProcess
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
  }, [pinnedPreviews, listedPreviews]);

  return (
    <ConversationListView
      isLoading={isLoading && (pinnedIsLoading || pinnedPreviews.length === 0)}
      isLoadingMore={isLoading && !pinnedIsLoading}
      conversations={conversationsProps}
    />
  );
};

export const ConversationListView: FunctionComponent<{
  isLoading: boolean;
  isLoadingMore: boolean;
  conversations: Conversation[];
}> = ({ isLoading, isLoadingMore, conversations }) => {
  if (isLoading) {
    return <LoadingList />;
  } else {
    if (conversations.length === 0) {
      return (
        <>
          <ul className="ConversationList List">
            <ConversationListItem
              key={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
              peerAddress={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
              subtitle={'Welcome! Send your first message...'}
              topMessageTime={new Date()}
            />
          </ul>
          <div style={{ margin: 'auto' }}>
            <InfoCard variant="empty conversation" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <ul className="ConversationList List">
            {conversations.map(({ peerAddress, messages }) => {
              return (
                <ConversationListItem
                  key={peerAddress}
                  peerAddress={peerAddress}
                  subtitle={messages[0].content}
                  topMessageTime={messages[0].sent as Date}
                />
              );
            })}
          </ul>
          {isLoadingMore && (
            <div
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}>
              <LoadingText />
            </div>
          )}
        </>
      );
    }
  }
};

let loggedCount = 0;
const logPinnableConversations = (conversations: string[]) => {
  if (loggedCount > 0) {
    return;
  } else {
    loggedCount++;
  }
  try {
    console.group('Pinning Instructions');
    console.log('For improved loading times, do the following:');
    console.log('- Copy the JSON array below');
    console.log(
      '- Open or create a conversation with the address 0xc8f907C6387e0989E75E06EDd2bfc3516806E358'
    );
    console.log(
      '- Paste the JSON array into the message input and send the message'
    );
    console.log('- Reload your convesations list');
    console.log(JSON.stringify(conversations));
    console.groupEnd();
  } catch {
    return;
  }
};
