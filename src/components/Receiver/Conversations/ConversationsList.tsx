import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { useConversations } from '../../../xmtp-react/conversations';
import Conversation from './Conversation';
import { useEnsAddress } from 'wagmi';
import { useEffect } from 'react';

interface ConversationsListProps {
  showConversations: boolean;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMewMessageDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setPeerAddress: (peerAddress: string | null | undefined) => unknown;
  showBox: boolean;
  showNewMessageDropdown: boolean;
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConversationsList({
  showConversations,
  setShowConversations,
  setShowMewMessageDropdown,
  setPeerAddress,
  setShowBox,
  showNewMessageDropdown,
}: ConversationsListProps) {
  const conversations = useConversations();
  const [newConversationInput, setNewConversationInput] = useState('');
  const userInput = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);

  const handleDropDownToggle = () => {
    setShowMewMessageDropdown(
      (showNewMessageDropdown) => !showNewMessageDropdown
    );
  };

  const { data } = useEnsAddress({
    name: newConversationInput,
    onSuccess(data) {
      if (data === null) {
        setPeerAddress(data);
      } else {
        setPeerAddress(data);
      }
    },
    onError(error) {
      console.log('Error', error);
    },
  });

  useEffect(() => {
    if (newConversationInput.length === 0) {
      return;
    }
    setPeerAddress(data);
  }, [count]);

  const handleSubmit = () => {
    if (userInput.current) {
      setNewConversationInput(userInput.current.value);
      setCount((count) => count + 1);
      setShowMewMessageDropdown(false);
      setShowConversations(false);
    }
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  const handleMinimizeConversations = () => {
    setShowBox(false);
    setShowMewMessageDropdown(false);
  };
  return (
    <Container showConversations={showConversations}>
      <Header>
        <IconTitleContainer>
          <svg
            onClick={handleMinimizeConversations}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="black"
            height={'24px'}
            width={'24px'}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
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
            height={'18px'}
            width={'18px'}>
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
            height={'24px'}
            width={'24px'}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </ExitSvg>

          <NewMessageHeader>
            Enter an ENS name or wallet address
          </NewMessageHeader>
          <Input
            autoFocus={true}
            ref={userInput}
            placeholder="type here"
            type="text"
          />
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
      {/* <RelayFooter /> */}
    </Container>
  );
}

interface StyleProps {
  showConversations?: boolean;
  showNewMessageDropdown?: boolean;
}

const Container = styled.div<StyleProps>`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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
  display: ${(props) => (props.showConversations ? 'flex' : 'none')};
  overflow-y: hidden;
`;

const Header = styled.header`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
  background: white;
  min-height: 62px;
  padding: 0px 10px;
`;

const TopTitle = styled.h1`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 22px;
`;

const TopButton = styled.button`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  padding: 5px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  white-space: nowrap;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ButtonText = styled.span`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
`;

const List = styled.ul`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: scroll;
  list-style: none;
  list-style-type: none;
`;

const NewMessageDropdown = styled.div<StyleProps>`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  text-align: center;
  margin-top: 80px;
  width: 100%;
`;

const Input = styled.input`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  background-color: white;
  border-radius: 4px;
  width: 100%;
  border: none;
  outline: none;
  padding: 5px 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Paragraph = styled.p`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  width: 100%;
  line-height: 1.25;
`;

const Button = styled.button`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  background: #5203fc;
  font-size: 15px;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const ExitSvg = styled.svg`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const IconTitleContainer = styled.div`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 5px;
`;
