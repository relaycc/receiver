import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessagesBucket from './MessagesBucket';
import LoadingMessages from './LoadingMessages';
import { Status, useXmtp } from '../../xmtp-react/context';
import Avatar from './Avatar';
import MessageInput from './MessageInput';

import {
  useMessages,
  useSendMessage,
  Status as SendMessageStatus,
} from '../../xmtp-react/conversations';
import StatusCard from './StatusCard';
import LoadingEnsName from './LoadingEnsName';
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

  if (isLoading)
    return (
      <LoadingEnsName />
    );

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
              title="Initialize XMTP Client..."
              subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
              buttonText="Initialize Client"
              isLoading={false}
              isError={false}
              errorText={'Signature request cancelled. Try again...'}
              loadingText="Awaiting signature..."
              onClick={xmtp.init}
            />
          </Centered>
          <AvatarContainer>
            <Avatar address={peerAddress} />
          </AvatarContainer>
        </>
      )}
      {xmtp.status === Status.waiting && (
        <>
          <Centered>
            <StatusCard
              title="Initialize XMTP Client..."
              subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
              buttonText="Initialize Client"
              isLoading={true}
              isError={false}
              errorText={'Signature request cancelled. Try again...'}
              loadingText="Awaiting signature..."
              onClick={() => null}
            />
          </Centered>
          <AvatarContainer>
            <Avatar address={peerAddress} />
          </AvatarContainer>
        </>
      )}
      {xmtp.status === Status.denied && (
        <>
          <Centered>
            <StatusCard
              title="Initialize XMTP Client..."
              subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
              buttonText="Initialize Client"
              isLoading={false}
              isError={true}
              errorText={'Signature request cancelled. Try again...'}
              loadingText="Awaiting signature..."
              onClick={xmtp.init}
            />
          </Centered>
          <AvatarContainer>
            <Avatar address={peerAddress} />
          </AvatarContainer>
        </>
      )}
      {xmtp.status === Status.loading && (
        <LoadingMessages />
      )}
      {xmtp.status === Status.ready && (
        <>
          <List>
            <div ref={divScrollToRef}></div>
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
        </>
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
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  height: 50px;
  width: 100%;
  background-color: white;
  padding: 10px 0px;
  box-shadow: 0px -4px 3px rgba(70, 96, 135, 0.1);
`;

const Centered = styled.div`
  position: absolute;
  left: 80px;
  bottom: 73px;
`;

const AvatarContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 25px;
  bottom: 73px;
`

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