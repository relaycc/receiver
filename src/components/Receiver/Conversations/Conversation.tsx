import styled from "styled-components";
import React from "react";
import { useEnsName } from "wagmi";
import { useMessages, getLastMessage } from "../../../xmtp-react/conversations";
import Avatar from "./Avatar";
import { useResponsiveName } from "../../../hooks/useResponsiveName";

interface ConversationProps {
  peerAddress: string;
}

export default function Conversation({ peerAddress }: ConversationProps) {
  const messages = useMessages(peerAddress);
  const lastMessage = getLastMessage(messages);
  console.log(lastMessage + " last");
  const { data: ensName, isLoading } = useEnsName({
    address: peerAddress,
  });
  const responsiveName = useResponsiveName(ensName, peerAddress, "");
  return (
    <Container>
      <ListItem>
        <Avatar peerAddress={peerAddress} />
        <TextContainer>
          <Title>{responsiveName}</Title>
          <Subtitle>{lastMessage?.content}</Subtitle>
        </TextContainer>
      </ListItem>
    </Container>
  );
}

const Container = styled.div``;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span``;

const Subtitle = styled.span`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
