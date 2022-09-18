import styled from 'styled-components';
import MessageBubble from './MessageBubble';
import { Avatar } from './Avatar';
import React from 'react';
import { Message, useResponsiveName, useEnsName } from '../../hooks';
import { time } from '../../utils/date';
import { shortDate } from '../../utils/date';

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
  const sentByMe = sentByAddress !== userPeerAddress;

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
      <SentByInfo sentByMe={sentByMe}>
        <div className="MessagesBucket MessageHeader">
          <div style={{ marginRight: '10px' }}>
            <Avatar handle={sentByAddress} onClick={() => null} />
          </div>
          <SenderName sentByMe={sentByMe}>{responsiveName}</SenderName>
          <div className="MessagesBucket MessageTime">
            {shortDate(startDate) + ', ' + time(startDate)}
          </div>
        </div>
      </SentByInfo>
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
interface StyleProps {
  sentByMe: boolean;
}

const SenderName = styled.div<StyleProps>`
  &&& {
    border-radius: 99rem;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    background-color: ${(props) => (props.sentByMe ? 'white' : '#F1F2FD')};
    color: ${(props) => (props.sentByMe ? 'black' : '#6E6B99')};
    padding: 3px 6px;
  }
`;

const SentByInfo = styled.div<StyleProps>`
  &&& {
    display: flex;
  }
`;
