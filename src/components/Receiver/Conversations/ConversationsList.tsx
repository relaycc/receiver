import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useConversations } from "../../../xmtp-react/conversations";
import Conversation from "./Conversation";
import { useEnsAddress } from "wagmi";
import { useEffect } from "react";
import { RelayFooter } from "../Footers/RelayFooter";

interface ConversationsListProps {
  showConversations: boolean;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMewMessageDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setPeerAddress: any;
  showBox: boolean;
  showNewMessageDropdown: boolean;
}

export function ConversationsList({
  showConversations,
  setShowConversations,
  setShowMewMessageDropdown,
  setPeerAddress,
  showBox,
  showNewMessageDropdown,
}: ConversationsListProps) {
  const conversations = useConversations();
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
      console.log("end");
      setPeerAddress(data);
    }
  }, [count]);

  const handleSubmit = () => {
    setNewConversationInput(userInput.current.value);
    setCount((count) => count + 1);
    setShowMewMessageDropdown(false);
    setShowConversations(false);
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      console.log("User pressed: ", e.key);
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <Container showConversations={showConversations}>
      <Header>
        <IconTitleContainer>
          <svg
            onClick={() => setShowConversations(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            height={"24px"}
            width={"24px"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>

          <TopTitle>Conversations</TopTitle>
        </IconTitleContainer>

        <TopButton onClick={handleDropDownToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            height={"18px"}
            width={"18px"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <ButtonText>New Message</ButtonText>
        </TopButton>
      </Header>
      {showNewMessageDropdown && (
        <NewMessageDropdown showNewMessageDropdown={showNewMessageDropdown}>
          <ExitSvg
            onClick={handleDropDownToggle}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            height={"24px"}
            width={"24px"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </ExitSvg>

          <NewMessageHeader>
            Enter an ens name or wallet address
          </NewMessageHeader>
          <Input ref={userInput} placeholder="type here" type="text" />
          <Button onClick={handleSubmit}>Create Conversation</Button>
          <Paragraph>
            * Only those who have previously signed into the XMTP network are
            reachable *
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
      <RelayFooter />
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
  min-height: 62px;
  padding: 0px 10px;
`;

const TopTitle = styled.h1`
  font-weight: 500;
  font-size: 22px;
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
  height: 100%;
  flex-direction: column;
  overflow: scroll;
`;

const NewMessageDropdown = styled.div<StyleProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  box-shadow: 0px -4px 4px -5px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 62px;
  z-index: 1010;
  left: 0;
  padding: 0px 10px;
  gap: 20px;
`;

const NewMessageHeader = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-top: 80px;
  width: 100%;
`;

const Input = styled.input`
  background-color: white;
  border-radius: 4px;
  width: 100%;
  border: none;
  outline: none;
  padding: 5px 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Paragraph = styled.p`
  text-align: center;
  width: 100%;
  line-height: 1.25;
`;

const Button = styled.button`
  padding: 5px;
  border-radius: 4px;
  border: 2px solid #313030;
  width: 100%;
`;

const ExitSvg = styled.svg`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const IconTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
