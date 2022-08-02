import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessagesBucket from './MessagesBucket';
import LoadingMessages from './LoadingMessages';
import { Status, useXmtp } from '../../xmtp-react/context';
import React, { useEffect, useState } from 'react'
import {
  useMessages,
} from '../../xmtp-react/conversations';
import Card from './Card';
import Button from './Button';
import { shortDate } from '../../utls/date';
import {ethers} from 'ethers';

import { useEnsAddress } from 'wagmi';

interface MessagesProps {
  peerAddress?: string;
  peerName?: string;
  onXmptReady: (isReady: boolean) => unknown;
}

const Messages = ({ peerAddress, peerName, onXmptReady }: MessagesProps) => {
  const xmtp = useXmtp();

  const messages = useMessages(peerAddress);
  const messageArray = Object.values(messages).reverse();
  const buckets = getMessageBuckets(messageArray);
  const [peerIsAvailable, setPeerIsAvailable] = useState<boolean | undefined>();

  useEffect(() => {
    if (xmtp.status === Status.ready && peerAddress) {
      const effect = async () => {
        const peerIsAvailable = await xmtp.client.canMessage(ethers.utils.getAddress(peerAddress));
        console.log('checked address: ' + peerAddress);
        console.log(peerIsAvailable);
        onXmptReady(peerIsAvailable);
        setPeerIsAvailable(peerIsAvailable);
      };
      effect();
    }
  });
  
  if (typeof peerAddress !== 'string') {
    return (
      <Card title="Could not resolve ENS name">
        <Text>Make sure to include the ".eth" suffix.</Text>
      </Card>
    );
  } else if (peerIsAvailable === false) {
    return (
      <Card title="User not on network">
        <Text>This user is not on the XMTP messaging network yet.</Text>
      </Card>
    );
  } else if (xmtp.status === Status.idle) {
    return (
      <Card title="Initialize XMTP Client">
        <Text>To begin messaging, you must first initialize the XMTP client.</Text>
        <Button onClick={xmtp.init} text='Initialize'/>
      </Card>
    );
  } else if (xmtp.status === Status.waiting) {
    return (
      <Card title="Initialize XMTP Client">
        <Text><b>Initializing.</b></Text>
        <Text>To continue, please sign the wallet prompt.</Text>
      </Card>
    );
  } else if (xmtp.status === Status.denied) {
    return (
      <Card title="Initialize XMTP Client">
        <Text><b>Initializing.</b></Text>
        <Text>Signature request cancelled. Try again...</Text>
        <Button onClick={xmtp.init} text='Initialize'/>
      </Card>
    );
  } else if (xmtp.status === Status.loading) {
    return (
      <LoadingMessages />
    );
  } else if (xmtp.status === Status.ready && peerIsAvailable === true) {
    if (Object.values(messages).length > 0) {
      return (    
        <List>
          {buckets.map((bucket, index) => {
            if (bucket.messages.length > 0) {
              return (
                <MessagesBucket
                  key={index}
                  messages={bucket.messages}
                  peerAddress={peerAddress}
                  startDate={bucket.date}
                />
              );
            }
            return null;
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