import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessagesBucket from './MessagesBucket';
import LoadingMessages from '../LoadingMessages';
import { Status } from '../../xmtp-react/status';
import React, { useEffect, useState } from 'react'
import {
  useMessages,
} from '../../xmtp-react/conversations';
import Card from '../Card';
import { shortDate } from '../../utls/date';
import { receiverStore } from '../../store';

interface MessagesProps {
  onXmptReady: (isReady: boolean) => unknown;
}

const Messages = ({ onXmptReady }: MessagesProps) => {
  const { xmtpStatus, client, peerAddress, peerName, messages: allMessages, conversations } = receiverStore();
  console.log(conversations);
  console.log('CONVOS');
  console.log(allMessages);
  console.log('MESSAGES');
  const [messages, setMessages] = useState<Record<string, Message>>({});
  const [messagesHaveBeenCalculated, setMessagesHaveBeenCalculated] = useState<boolean>(false);
  const messageArray = messages ? Object.values(messages).reverse() : [];
  const buckets = getMessageBuckets(messageArray);
  const [peerIsAvailable, setPeerIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (xmtpStatus === Status.ready && peerAddress && client) {
      setMessages(allMessages[peerAddress])

      const fetchPeerAvailability = async () => {
        const available = await client.canMessage(peerAddress);
        setPeerIsAvailable(available)
        onXmptReady(available);
        setMessagesHaveBeenCalculated(true);
      }
      
      fetchPeerAvailability();
    };
  }, [xmtpStatus, peerAddress]);
  
  if (typeof peerAddress !== 'string') {
    return (
      <Card title="Could not resolve ENS name">
        <Text>Make sure to include the ".eth" suffix.</Text>
      </Card>
    );
  } else if (messagesHaveBeenCalculated && peerIsAvailable === false) {
    return (
      <Card title="User not on network">
        <Text>This user is not on the XMTP messaging network yet.</Text>
      </Card>
    );
  } else if (xmtpStatus === Status.idle) {
    return (
      <Card title="Initialize XMTP Client">
        <Text>To begin messaging, you must first initialize the XMTP client.</Text>
      </Card>
    );
  } else if (xmtpStatus === Status.waiting) {
    return (
      <Card title="Initialize XMTP Client">
        <Text><b>Initializing.</b></Text>
        <Text>To continue, please sign the wallet prompt.</Text>
      </Card>
    );
  } else if (xmtpStatus === Status.denied) {
    return (
      <Card title="Initialize XMTP Client">
        <Text><b>Initializing.</b></Text>
        <Text>Signature request cancelled. Try again...</Text>
      </Card>
    );
  } else if (xmtpStatus === Status.loading) {
    return (
      <LoadingMessages />
    );
  } else if (messagesHaveBeenCalculated) {
    if (messageArray.length > 0) {
      return (    
        <List>
          {buckets.map((bucket, index) => {
            return (
              <MessagesBucket
                key={index}
                messages={bucket.messages}
                startDate={bucket.date}
              />
            );
          })}
        </List>
      ) 
    } else {
      return (
        <Card title="All Set  🎉">
          <Text>{`This is the beginning of your conversation with ${peerName}`}</Text>
        </Card>
      )
    }
  } else {
    return <></>
  }
}

const List = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: scroll;
  gap: 0.75rem;
  width: 100%;
  z-index: 10;
  max-height: 345px;
  padding: 12px;
`;

const Text = styled.div`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #2D2D2D;
`;

class Bucket {
  date: string;
  messages: Message[];
}

// This assumes messages are sorted by date already.
function getMessageBuckets(messages: Message[]): Bucket[] {
  return messages.reduce((buckets: Bucket[], message: Message) => {
    if (message.sent) {
      let dateString = shortDate(message.sent);
      
      let bucket = buckets.find(bucket => bucket.date === dateString);

      if (bucket) {
        bucket.messages.push(message);
        return buckets;
      } else {
        let bucket = new Bucket();
        bucket.date = shortDate(message.sent);
        bucket.messages = [message];
        buckets.push(bucket);
        return buckets;
      }
    } else {
      return buckets;
    }
  }, []);
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