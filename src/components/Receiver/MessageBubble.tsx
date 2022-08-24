import styled from "styled-components";
import React from "react";
import { time } from "../../utls/date";
import { truncate } from "../../utls/address";

interface TextBubbleProps {
  message: string;
  sentByMe: boolean;
  messageTime: Date | undefined;
  senderAddress?: string;
  peerAddress?: string;
}

const MessageBubble = (props: TextBubbleProps) => {
  return (
    <TextWrapper sentByMe={props.sentByMe}>
      <MessageHeader>
        <SenderName sentByMe={props.sentByMe}>
          {props.sentByMe ? truncate(props.senderAddress) : truncate(props.peerAddress)}
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
  font-family: "Circular Std", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  word-break: break-word;
  text-align: start;
  padding-left: 4px;
`;

const MessageTime = styled.div<{ sentByMe: boolean }>`
  font-family: "Circular Std", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding-top: 5px;
  letter-spacing: 1px;
  margin-left: 8px;
  color: #060028;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
`;
const SenderName = styled.div<{ sentByMe: boolean }>`
  border-radius: 99rem;
  font-weight: 900;
  font-size: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.sentByMe ? "white" : "#F1F2FD")};
  color: ${(props) => (props.sentByMe ? "black" : "#6E6B99")};
  padding: 3px 6px;
`;
export default MessageBubble;
