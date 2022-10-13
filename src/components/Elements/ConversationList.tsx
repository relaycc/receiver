import React, { FunctionComponent } from 'react';
import { useClient, useConversations, usePinnedAddresses } from '../../hooks';
import { Message } from '@relaycc/xmtp-js';
import { ConversationListItem } from './ConversationListItem';
import { InfoCard } from './InfoCard';
import { LoadingList } from './LoadingList';

export const ConversationList: FunctionComponent = () => {
  const [, clientQuery] = useClient();
  const [pinnedAddressesQuery, pinnedMessagesQuery] = usePinnedAddresses();
  const [listQuery, messagesQuery] = useConversations();

  const pinnedIsLoading =
    pinnedAddressesQuery.isLoading ||
    Boolean(pinnedMessagesQuery.find((mq) => mq.isLoading));

  const isLoading =
    listQuery.isLoading || Boolean(messagesQuery.find((mq) => mq.isLoading));

  if (isLoading || clientQuery.data === undefined) {
    if (
      pinnedIsLoading ||
      pinnedMessagesQuery.length === 0 ||
      clientQuery.data === undefined
    ) {
      return <LoadingList />;
    } else {
      const messages = pinnedMessagesQuery
        .map((mq) => mq.data && mq.data[0])
        .filter((mq) => mq !== undefined)
        .sort(sortByDate)
        .reverse();

      return (
        <>
          <ul className="ConversationList List">
            {messages.map((message, i) => {
              if (message === undefined) {
                return (
                  <ConversationListItem
                    order={0}
                    key={
                      '0x45C9a201e2937608905fEF17De9A67f25F9f98E0-' + String(i)
                    }
                    peerAddress={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
                    subtitle={'Welcome! Send your first message...'}
                    topMessageTime={new Date()}
                  />
                );
              } else {
                try {
                  return (
                    <ConversationListItem
                      order={i}
                      key={pickPeerAddress(clientQuery.data.address, message)}
                      peerAddress={pickPeerAddress(
                        clientQuery.data.address,
                        message
                      )}
                      subtitle={message.content}
                      topMessageTime={message.sent as Date}
                    />
                  );
                } catch (err) {
                  console.error(err);
                  return null;
                }
              }
            })}
          </ul>
          {isLoading && (
            <h6 style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Loading remaining conversations...
            </h6>
          )}
        </>
      );
    }
  } else {
    if (messagesQuery.length === 0) {
      return (
        <>
          <ul className="ConversationList List">
            <ConversationListItem
              order={0}
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
      const messages = messagesQuery
        .map((mq) => mq.data && mq.data[0])
        .filter((mq) => mq !== undefined)
        .sort(sortByDate)
        .reverse();

      return (
        <ul className="ConversationList List">
          {messages.map((message, i) => {
            if (message === undefined) {
              return (
                <ConversationListItem
                  order={0}
                  key={
                    '0x45C9a201e2937608905fEF17De9A67f25F9f98E0-' + String(i)
                  }
                  peerAddress={'0x45C9a201e2937608905fEF17De9A67f25F9f98E0'}
                  subtitle={'Welcome! Send your first message...'}
                  topMessageTime={new Date()}
                />
              );
            } else {
              try {
                return (
                  <ConversationListItem
                    order={i}
                    key={pickPeerAddress(clientQuery.data.address, message)}
                    peerAddress={pickPeerAddress(
                      clientQuery.data.address,
                      message
                    )}
                    subtitle={message.content}
                    topMessageTime={message.sent as Date}
                  />
                );
              } catch (err) {
                console.error(err);
                return null;
              }
            }
          })}
        </ul>
      );
    }
  }
};

function sortByDate(a: Message | undefined, b: Message | undefined) {
  if (a === undefined || a.sent === undefined) return -1;
  if (b === undefined || b.sent === undefined) return 1;
  return a.sent.getTime() <= b.sent.getTime() ? -1 : 1;
}

const pickPeerAddress = (clientAddress: string, message: Message): string => {
  return clientAddress === message.senderAddress
    ? (message.recipientAddress as string)
    : (message.senderAddress as string);
};
