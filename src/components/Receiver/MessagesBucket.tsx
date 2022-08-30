import styled from "styled-components";
import { Message } from "@xmtp/xmtp-js";
import MessageBubble from "./MessageBubble";
import Avatar from "./Avatar";
import React from "react";
import { useResponsiveName } from "../../hooks/useResponsiveName";
import { useEnsName } from "wagmi";
import { time } from '../../utls/date'
import { shortDate } from '../../utls/date'

interface MessagesBucketProps {
  peerAddress: string;
  startDate: Date | undefined;
  messages: Message[];
  peerName?: string | undefined;
  sentByAddress: any;
}

export default function MessagesBucket({
  peerAddress,
  startDate,
  messages,
  peerName,
  sentByAddress,
}: MessagesBucketProps) {
  const sentByMe = sentByAddress !== peerAddress;

  if (messages.length === 0) return null;

  const { data: senderName } = useEnsName({
    address: sentByAddress,
  });
  const { data: peerEns } = useEnsName({
    address: peerAddress,
  });

  return (
    <Container>
      <SentByInfo sentByMe={sentByMe}>
        <MessageHeader>
          <div style={{ marginRight: "10px" }}>
            <Avatar address={sentByMe ? sentByAddress : peerAddress} />
          </div>
          <SenderName sentByMe={sentByMe}>
            {sentByMe
              ? useResponsiveName(senderName, sentByAddress, "")
              : useResponsiveName(peerEns, peerAddress, "")}
          </SenderName>
          <MessageTime>{shortDate(startDate) + ", " + time(startDate)}</MessageTime>
        </MessageHeader>
      </SentByInfo>
      <FlexColReverseContainer>
        {messages.map((e: any) => {
          return (
            <MessagePosition key={e.id}>
              <MessageBubble
                message={e.content}
                messageTime={e.sent}
                sentByMe={sentByMe}
                senderAddress={e.senderAddress}
                peerAddress={peerAddress}
                peerName={peerName}
              />
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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BucketTimestamp = styled.div`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #333333;
`;

const MessagePosition = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  align-self: flex-start;

  //bottom message because of column reverse format
  :first-of-type {
    padding-bottom: 4px;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: -18px;

`;

const SenderName = styled.div<StyleProps>`
  border-radius: 99rem;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.sentByMe ? "white" : "#F1F2FD")};
  color: ${(props) => (props.sentByMe ? "black" : "#6E6B99")};
  padding: 3px 6px;
`;

const SentByInfo = styled.div<StyleProps>`
  display: flex;
`;

const MessageTime = styled.div`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
  color: rgb(6, 0, 40, 0.4);
  transform: translateY(2px);
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const FlexColReverseContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
