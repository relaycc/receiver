import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessagesBucket from './MessagesBucket';
import LoadingMessages from './LoadingMessages';
import { Status, useXmtp } from '../../xmtp-react/context';
import MessageInput from './MessageInput';
import React from 'react'

import {
  useMessages,
  useSendMessage,
  Status as SendMessageStatus,
} from '../../xmtp-react/conversations';
import StatusCard from './StatusCard';
import { useEnsAddress } from 'wagmi';

interface MessagesProps {
  providedPeerAddress?: string;
  onXmptReady: () => unknown;
}

const Messages = ({ providedPeerAddress, onXmptReady }: MessagesProps) => {
  const { data: peerAddress, isError, isLoading } = useEnsAddress({
    name: providedPeerAddress
  })

  const xmtp = useXmtp();

  const messages = useMessages(peerAddress);
  const sendMessage = useSendMessage();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const divScrollToRef = useRef<HTMLInputElement>(null);

  const openMenu = useCallback(() => setShowMenu(true), [setShowMenu]);
  const closeMenu = useCallback(() => setShowMenu(false), [setShowMenu]);

  const doSendMessage = useCallback(
    async (message: string) => {
      if (peerAddress && sendMessage.status === SendMessageStatus.ready) {
        sendMessage.send(peerAddress, message);
      }
    },
    [sendMessage, peerAddress]
  );

  const buckets = getMessageBuckets(
    Object.values(messages)
      .map((x) => x)
      .reverse()
  );

  if (xmtp.status === Status.ready) {
    onXmptReady();
  }

  if (typeof peerAddress !== 'string')
    return (
      <Page>
        <Centered>
          <StatusCard
            title="Could not resolve ENS name"
            subtitle='Make sure to include the ".eth" suffix.'
            buttonText=""
            isLoading={false}
            isError={true}
            errorText={'Go Back to Conversations'}
            loadingText=""
            onClick={() => null}
          />
        </Centered>
      </Page>
    );

  return (
    <>
    <Page>
      {xmtp.status === Status.idle && (
        <>
          <Centered>
            <StatusCard
              title="Initialize XMTP Client"
              subtitle="To begin messaging, you must first initialize the XMTP client."
              buttonText="Initialize"
              isLoading={false}
              isError={false}
              errorText={'Signature request cancelled. Try again...'}
              loadingText="Awaiting signature"
              onClick={xmtp.init}
            />
          </Centered>
        </>
      )}
      {xmtp.status === Status.waiting && (
        <>
          <Centered>
            <StatusCard
              title="Initialize XMTP Client"
              subtitleHeader="Initializing"
              subtitle="To continue, please sign the wallet prompt."
              buttonText="Initialize"
              isLoading={true}
              isError={false}
              errorText={'Signature request cancelled. Try again...'}
              loadingText="Awaiting signature"
              onClick={() => null}
            />
          </Centered>
        </>
      )}
      { (xmtp.status === Status.denied)  && (
        <>
          <Centered>
            <StatusCard
              title="Initialize XMTP Client"
              subtitleHeader="Initializing"
              subtitle="To continue, please sign the wallet prompt."
              buttonText="Initialize"
              isLoading={false}
              isError={true}
              errorText={'Signature request cancelled. Try again...'}
              loadingText="Awaiting signature"
              onClick={xmtp.init}
            />
          </Centered>
        </>
      )}
      {xmtp.status === Status.loading && (
        <LoadingMessages />
      )}
      {xmtp.status === Status.ready && (
        Object.values(messages).length > 0 ? (
          <List>
            {buckets.map((bucketMessages, index) => {
              if (bucketMessages.length > 0) {
                return (
                  <MessagesBucket
                    key={index}
                    messages={bucketMessages}
                    peerAddress={peerAddress}
                    startDate={bucketMessages[0].sent}
                    sentByAddress={bucketMessages[0].senderAddress}
                  />
                );
              }
              return null;
            })}
          </List>
        ) : (
          <Centered>
            <StatusCard
              title="All Set  🎉"
              subtitle={`This is the beginning of your conversation with ${providedPeerAddress}`}
              buttonText="Initialize"
              isLoading={false}
              isFirstMessagePrompt={true}
              isError={false}
              onClick={() => null}
            />
          </Centered>
        )
      )}
    </Page>
    {xmtp.status === Status.ready && (
      <RelayInputFooter>
        <MessageInput
          onSendMessage={doSendMessage}
        />
      </RelayInputFooter>
    )}
    </>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 363px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  overflow: scroll;
  gap: 0.75rem;
  padding: 1rem;
  width: 100%;
  z-index: 10;
  max-height: 375px;
`;

const RelayInputFooter = styled.div`
  position: absolute;
  bottom: 0;
  color: #333333;
  text-align: center;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  height: 45px;
  width: 100%;
  background-color: white;
`;

const Centered = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  flex: 1;
  justify-content: center;
`;


// This assumets messages are sorted by date already.
function getMessageBuckets(messages: Message[]): Array<Message[]> {
  return messages.reduce(
    (buckets: Array<Message[]>, message: Message) => {
      // If sent isn't set, always add it as it's own bucket
      if (message.sent === undefined) {
        return [...buckets, [message]];
      }

      // We initialize the reducer with [[]] so buckets should always be non-empty.
      const lastBucket = buckets[buckets.length - 1] as Message[];
      if (lastBucket.length === 0) return [[message]];

      // If this is the initial iteration, initialize buckets.
      if (buckets.length === 1 && buckets[0].length === 0) {
        const result: Array<Message[]> = [[message]];
        return result;
      }

      // If the last message in the last bucket is either sent to a different
      // address, undefined, sent is not set on it, or it's older than 5 minutes
      // from the current message, create a new bucket.
      const lastInLastBucket = buckets[buckets.length - 1]?.[0];
      if (lastInLastBucket?.recipientAddress !== message.recipientAddress)
        return [...buckets, [message]];
      if (lastInLastBucket === undefined) return [...buckets, [message]];
      if (lastInLastBucket.sent === undefined) return [...buckets, [message]];
      if (isFiveMinuteDifference(lastInLastBucket.sent, message.sent)) {
        return [...buckets, [message]];
      }

      // If the first message in the last bucket is either undefined, sent is
      // not set on it, or it's older than an hour from the current message,
      // create a new bucket.
      const firstInLastBucket = buckets[buckets.length - 1]?.[0];
      if (firstInLastBucket === undefined) return [...buckets, [message]];
      if (firstInLastBucket.sent === undefined) return [...buckets, [message]];
      if (isHourDifference(firstInLastBucket.sent, message.sent))
        return [...buckets, [message]];

      // If we got here then we just add the current message to the last bucket.
      lastBucket.push(message);
      return buckets;
    },
    // If you change this you might break this function, in particular the line
    // where we assert that the last bucket is type Message[].
    [[]]
  );
}

function isHourDifference(a: Date, b: Date): boolean {
  // 360000 is milliseconds in an hour
  return Math.abs(a.getTime() - b.getTime()) > 3600000;
}

function isFiveMinuteDifference(a: Date, b: Date): boolean {
  // 300000 is milliseconds in 5 minutes
  return Math.abs(a.getTime() - b.getTime()) > 300000;
}

export default Messages;