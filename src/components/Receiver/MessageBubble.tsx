import styled from "styled-components";
import React from "react";
import { time } from "../../utls/date";
import { truncateName, truncateAddress } from "../../utls/address";
import { useEnsName } from "wagmi";
interface TextBubbleProps {
  message: string;
  sentByMe: boolean;
  messageTime: Date | undefined;
  senderAddress?: string;
  peerAddress?: string;
  peerName?: string | undefined;
}

const MessageBubble = (props: TextBubbleProps) => {
  const { data: senderName } = useEnsName({
    address: props.senderAddress,
  });

  return (
    <TextWrapper sentByMe={props.sentByMe}>
      <MessageHeader>
        <SenderName sentByMe={props.sentByMe}>
          {props.sentByMe
            ? senderName
              ? truncateName(senderName)
              : truncateAddress(props.senderAddress)
            : props.peerName
            ? truncateName(props.peerName)
            : truncateAddress(props.peerAddress)}
        </SenderName>
        {props.messageTime && (
          <MessageTime sentByMe={props.sentByMe}>
            {time(props.messageTime)}
          </MessageTime>
        )}
      </MessageHeader>
      <MessageText sentByMe={props.sentByMe}>{props.message}</MessageText>
    </TextWrapper>
  );
};

const TextWrapper = styled.div<{ sentByMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  hyphens: auto;
`;

const MessageText = styled.div<{ sentByMe: boolean }>`
  color: #060028;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  word-break: break-word;
  text-align: start;
  padding-left: 4px;
`;

const MessageTime = styled.div<{ sentByMe: boolean }>`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-left: 8px;
  color: #060028;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
`;

const SenderName = styled.div<{ sentByMe: boolean }>`
  border-radius: 99rem;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.sentByMe ? "white" : "#F1F2FD")};
  color: ${(props) => (props.sentByMe ? "black" : "#6E6B99")};
  padding: 3px 6px;
`;

export default MessageBubble;
