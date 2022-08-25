import styled from "styled-components";
import React from "react";
import { useConversations } from "../../../xmtp-react/conversations";
import Conversation from './Conversation'
import { useEffect } from 'react'
import { Status } from '../../../xmtp-react/context';

export function ConversationsList() {

  const conversations  = useConversations()

  return (
    <Container>
      <Header>
        <TopTitle>Conversations</TopTitle>
        <TopButton>
            {/* <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="15px"
              height="15px"
            >
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 13.978516 A 1.50015 1.50015 0 0 0 22.5 15.5 L 22.5 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 22.5 25.5 L 22.5 32.5 A 1.50015 1.50015 0 1 0 25.5 32.5 L 25.5 25.5 L 32.5 25.5 A 1.50015 1.50015 0 1 0 32.5 22.5 L 25.5 22.5 L 25.5 15.5 A 1.50015 1.50015 0 0 0 23.976562 13.978516 z" />
            </svg> */}
          <ButtonText>New Message</ButtonText>
        </TopButton>
      </Header>
      <List>
      {conversations.map((peerAddress) => (
            <Conversation key={peerAddress} peerAddress={peerAddress} />
         ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);

`;
const TopTitle = styled.h1`
  font-size: 14px;
`;

const TopButton = styled.button`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 4px;
  white-space: nowrap;
  border: none;
  background-color: white;
`;

const ButtonText = styled.span``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

