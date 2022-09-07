import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

export interface NewConversationProps {
  onClickCreate: (peerAddress: string) => unknown;
}

export const NewConversation: FunctionComponent<NewConversationProps> = ({
  onClickCreate,
}) => {
  const [peerAddress, setPeerAddress] = useState('');

  return (
    <NewMessageDropdown>
      <NewMessageHeader>Enter an ENS name or wallet address</NewMessageHeader>
      <Input
        autoFocus={true}
        placeholder="Start typing..."
        type="text"
        value={peerAddress}
        onChange={(e) => {
          e.preventDefault();
          setPeerAddress(e.currentTarget.value);
        }}
      />
      <Button onClick={() => onClickCreate(peerAddress)}>
        Create Conversation
      </Button>
      <Paragraph>
        * Only those who have previously signed into the XMTP network are
        reachable *
      </Paragraph>
    </NewMessageDropdown>
  );
};

const NewMessageDropdown = styled.div`
  &&& {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    box-shadow: 0px -4px 4px -5px rgba(0, 0, 0, 0.25);
    gap: 20px;
    padding: 0 10px;
  }
`;

const NewMessageHeader = styled.h2`
  &&& {
    color: black;
    font-size: 18px;
    text-align: center;
    margin-top: 1rem;
    width: 100%;
  }
`;

const Input = styled.input`
  &&& {
    background-color: white;
    border-radius: 4px;
    display: flex;
    align-self: stretch;
    border: none;
    outline: none;
    padding: 5px 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Paragraph = styled.p`
  &&& {
    text-align: center;
    width: 100%;
    line-height: 1.25;
  }
`;

const Button = styled.button`
  &&& {
    display: flex;
    align-self: center;
    padding: 8px;
    border-radius: 4px;
    background: #5203fc;
    font-size: 15px;
    color: white;
    font-weight: 600;
    border: none;
  }
`;
