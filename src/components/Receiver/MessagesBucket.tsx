import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessageBubble from './MessageBubble';
import Avatar from './Avatar';
import React from 'react';
import { useResponsiveName } from '../../hooks/useResponsiveName';
import { useEnsName } from 'wagmi';
import { time } from '../../utls/date';
import { shortDate } from '../../utls/date';

interface MessagesBucketProps {
  peerAddress: string;
  startDate: Date | undefined;
  messages: Message[];
  peerName?: string | undefined;
  sentByAddress: string | undefined;
}

export default function MessagesBucket({
  peerAddress,
  startDate,
  messages,
  sentByAddress,
}: MessagesBucketProps) {
  const sentByMe = sentByAddress !== peerAddress;

  const { data: senderName } = useEnsName({
    address: sentByAddress,
  });
  const { data: peerEns } = useEnsName({
    address: peerAddress,
  });
  const responsiveName = useResponsiveName(
    sentByMe ? senderName : peerEns,
    sentByMe ? sentByAddress : peerAddress,
    ''
  );

  if (messages.length === 0) return null;

  return (
    <Container>
      <SentByInfo sentByMe={sentByMe}>
        <MessageHeader>
          <div style={{ marginRight: '10px' }}>
            <Avatar address={sentByMe ? sentByAddress : peerAddress} />
          </div>
          <SenderName sentByMe={sentByMe}>{responsiveName}</SenderName>
          <MessageTime>
            {shortDate(startDate) + ', ' + time(startDate)}
          </MessageTime>
        </MessageHeader>
      </SentByInfo>
      <FlexColReverseContainer>
        {messages.map((e: Message) => {
          return (
            <MessagePosition key={e.id}>
              <MessageBubble message={e.content} />
            </MessagePosition>
          );
        })}
      </FlexColReverseContainer>
    </Container>
  );
}
interface StyleProps {
  sentByMe: boolean;
}

const Container = styled.div`
  &&& {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const MessagePosition = styled.div`
  &&& {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    align-self: flex-start;

    //bottom message because of column reverse format
    :first-of-type {
      padding-bottom: 4px;
    }
  }
`;

const MessageHeader = styled.div`
  &&& {
    display: flex;
    align-items: flex-start;
    margin-bottom: -18px;
  }
`;

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

const MessageTime = styled.div`
  &&& {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    margin-left: 8px;
    color: rgb(6, 0, 40, 0.4);
    transform: translateY(2px);
  }
`;

const FlexColReverseContainer = styled.div`
  &&& {
    display: flex;
    flex-direction: column-reverse;
  }
`;
