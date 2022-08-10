import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import LoadingMessages from '../LoadingMessages';
import { Status } from '../../xmtp-react/status';
import React, { useEffect, useState } from 'react'
import {
  useMessages,
} from '../../xmtp-react/conversations';
import Card from '../Card';
import { shortDate } from '../../utls/date';
import { receiverStore } from '../../store';
import ConversationCard from './ConversationCard';

const Messages = () => {
  const { xmtpStatus, client, peerName, peerIsAvailable, conversations } = receiverStore();
  
  const conversationArray = Object.values(conversations).reverse();
  console.log(conversationArray);
  
  if (xmtpStatus === Status.idle) {
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
  } else if (xmtpStatus === Status.ready) {
    if (conversationArray.length > 0) {
      return (    
        <List>
          {conversationArray.map((conversation, index) => {
            return (
              <ConversationCard key={index} conversation={conversation}/>
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

function isHourDifference(a: Date, b: Date): boolean {
  // 360000 is milliseconds in an hour
  return Math.abs(a.getTime() - b.getTime()) > 3600000;
}

function isFiveMinuteDifference(a: Date, b: Date): boolean {
  // 300000 is milliseconds in 5 minutes
  return Math.abs(a.getTime() - b.getTime()) > 300000;
}

export default Messages;