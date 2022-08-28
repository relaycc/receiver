import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useConversations } from "../../../xmtp-react/conversations";
import Conversation from "./Conversation";
import { useEnsAddress } from "wagmi";
import { useEffect } from "react";

interface ConversationsListProps {
  showConversations: boolean;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setPeerAddress: any;
}

export function ConversationsList({
  showConversations,
  setShowConversations,
  setPeerAddress,
}: ConversationsListProps) {
  const conversations = useConversations();
  const [showNewMessageDropdown, setShowMewMessageDropdown] = useState(false);
  const [newConversationInput, setNewConversationInput] = useState("");
  const userInput: any = useRef();
  const [count, setCount] = useState(0);

  const handleDropDownToggle = () => {
    setShowMewMessageDropdown(
      (showNewMessageDropdown) => !showNewMessageDropdown
    );
  };

  const { data, isError, isLoading } = useEnsAddress({
    name: newConversationInput,
    onSuccess(data) {
      if (data === null) {
        setPeerAddress(data);
      } else {
        setPeerAddress(data);
      }
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    if (newConversationInput.length === 0) {
      return;
    }
    if (isLoading) {
      console.log("Loading");
    }
    if (isError) {
      console.log(isError + " myError");
    }
    if (data) {
      setPeerAddress(data);
      console.log("whow");
    } else {
      console.log('end')
      setPeerAddress(data);
    }
  }, [count]);

  const handleSubmit = () => {
    setNewConversationInput(userInput.current.value);
    setCount((count) => count + 1);
    setShowMewMessageDropdown(false);
    setShowConversations(false);
  };

  

  return (
    <Container showConversations={showConversations}>
      <Header>
        <TopTitle>Conversations</TopTitle>
        <TopButton onClick={handleDropDownToggle}>
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="15px"
            height="15px"
          >
            <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 13.978516 A 1.50015 1.50015 0 0 0 22.5 15.5 L 22.5 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 22.5 25.5 L 22.5 32.5 A 1.50015 1.50015 0 1 0 25.5 32.5 L 25.5 25.5 L 32.5 25.5 A 1.50015 1.50015 0 1 0 32.5 22.5 L 25.5 22.5 L 25.5 15.5 A 1.50015 1.50015 0 0 0 23.976562 13.978516 z" />
          </svg>
          <ButtonText>New Message</ButtonText>
        </TopButton>
      </Header>
      {showNewMessageDropdown && (
        <NewMessageDropdown showNewMessageDropdown={showNewMessageDropdown}>
          <NewMessageHeader>
            Enter the ens name or wallet address of the person you would like to
            chat with
          </NewMessageHeader>
          <Input ref={userInput} placeholder="type here" type="text" />
          <Button onClick={handleSubmit}>Create Conversation</Button>
          <Paragraph>
            You are only able to reach people who have previously signed into
            the XMTP network
          </Paragraph>
        </NewMessageDropdown>
      )}
      <List>
        {conversations.map((peerAddress) => (
          <Conversation
            setPeerAddress={setPeerAddress}
            setShowConversations={setShowConversations}
            key={peerAddress}
            peerAddress={peerAddress}
          />
        ))}
      </List>
    </Container>
  );
}

interface StyleProps {
  showConversations?: boolean;
  showNewMessageDropdown?: boolean;
}

const Container = styled.div<StyleProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  background: white;
  display: ${(props) => (props.showConversations ? "flex" : "none")};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
  background: white;
  min-height: 69px;
  padding: 0px 22px;
`;

const TopTitle = styled.h1`
  font-weight: bold;
  font-size: 18px;
`;

const TopButton = styled.button`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  padding: 5px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  white-space: nowrap;
  border: none;
  background-color: white;
`;

const ButtonText = styled.span`
  font-weight: bold;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const NewMessageDropdown = styled.div<StyleProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 71px;
  left: 0;
  padding: 0px 10px;
  gap: 20px;
  animation: scale 300ms ease-in-out forwards;

  @keyframes scale {
    0% {
      transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const NewMessageHeader = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-top: 80px;
`;

const Input = styled.input`
  background-color: white;
  border-radius: 4px;
  width: 90%;
  border: none;
  outline: none;
  padding: 5px 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Paragraph = styled.p`
  text-align: center;
`;

const Button = styled.button`
  padding: 5px;
  border-radius: 4px;
  border: 2px solid #313030;
`;
