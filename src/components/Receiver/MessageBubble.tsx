import styled from "styled-components";
import React from "react";
import { time } from "../../utls/date";
import { truncateName, truncateAddress } from "../../utls/address";
import { useEnsName } from "wagmi";
import { useResponsiveName } from "../../hooks/useResponsiveName";

interface TextBubbleProps {
  message: string;
  sentByMe?: boolean;
  messageTime: Date | undefined;
  senderAddress?: string;
  peerAddress?: string;
  peerName?: string | undefined;
}

const MessageBubble = ({
  message,
  sentByMe,
  messageTime,
  senderAddress,
  peerAddress,
  peerName,
}: TextBubbleProps) => {
  const { data: senderName } = useEnsName({
    address: senderAddress,
  });
  const { data: peerEns } = useEnsName({
    address: peerAddress,
  });

  return (
    <TextWrapper>
      <MessageText>{message}</MessageText>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  hyphens: auto;
  padding-left: 50px;
`;

const MessageText = styled.div`
  color: #060028;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  word-break: break-word;
  text-align: start;
  padding-left: 4px;
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
