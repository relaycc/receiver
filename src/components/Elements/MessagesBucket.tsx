import MessageBubble from './MessageBubble';
import { Avatar } from './Avatar';
import React from 'react';
import { Message, useResponsiveName, useEnsName } from '../../hooks';
import { getDisplayDate } from '../../utils/date';

interface MessagesBucketProps {
  startDate: Date | undefined;
  messages: Message[];
  peerName?: string | undefined;
  sentByAddress: string;
  userPeerAddress: string;
}

export default function MessagesBucket({
  startDate,
  messages,
  sentByAddress,
  userPeerAddress,
}: MessagesBucketProps) {
  const sentByMe = sentByAddress === userPeerAddress;

  const { name: senderName } = useEnsName({
    handle: sentByAddress,
  });
  const { name: peerEns } = useEnsName({
    handle: sentByAddress,
  });
  const responsiveName = useResponsiveName(
    sentByMe ? senderName : peerEns,
    sentByMe ? userPeerAddress : sentByAddress,
    ''
  );

  if (messages.length === 0) return null;

  return (
    <div className="MessagesBucket Container">
      <div className="MessagesBucket SentByInfo">
        <div className="MessagesBucket MessageHeader">
          <div style={{ marginRight: '10px' }}>
            <Avatar handle={sentByAddress} onClick={() => null} />
          </div>
          <div
            className={`MessagesBucket SenderName black-${sentByMe} white-${sentByMe}`}>
            {responsiveName}
          </div>
          <div className="MessagesBucket MessageTime">
            {getDisplayDate(startDate)}
          </div>
        </div>
      </div>
      <div className="MessagesBucket FlexColReverseContainer">
        {messages.map((e: Message) => {
          return (
            <div className="MessagesBucket MessagePosition" key={e.id}>
              <MessageBubble message={e.content} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
