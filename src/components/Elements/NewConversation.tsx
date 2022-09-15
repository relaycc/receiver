import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { InfoCard } from './InfoCard';
import { isEnsName, isLensName, isEthAddress } from '../../hooks';

export interface NewConversationProps {
  onClickCreate: (peerAddress: string) => unknown;
}

export const NewConversation: FunctionComponent<NewConversationProps> = ({
  onClickCreate,
}) => {
  const [peerAddress, setPeerAddress] = useState('');
  const [isError, setisError] = useState(false);

  return (
    <NewMessage>
      <NewConversationForm
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !isEnsName(peerAddress) &&
            !isEthAddress(peerAddress) &&
            !isLensName(peerAddress)
          ) {
            setisError(true);
          } else {
            onClickCreate(peerAddress);
          }
        }}>
        {isError && <ErrorMessage>Please enter a valid handle...</ErrorMessage>}
        <Input
          autoFocus={true}
          placeholder="Enter an ENS name, Lens handle, or ETH address..."
          type="text"
          value={peerAddress}
          onChange={(e) => {
            setisError(false);
            setPeerAddress(e.currentTarget.value);
          }}
        />
        <Button type="submit">Create a New Conversation</Button>
      </NewConversationForm>
      <InfoCard variant={'new conversation'} />
    </NewMessage>
  );
};

const NewMessage = styled.div`
  &&& {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: white;
    box-shadow: 0px -4px 4px -5px rgba(0, 0, 0, 0.25);
    gap: 20px;
    padding: 0 10px 0 10px;
  }
`;

const Input = styled.input`
  &&& {
    display: flex;
    flex-grow: 1;
    background-color: white;
    border-radius: 4px;
    display: flex;
    align-self: stretch;
    outline: none;
    border: none;
    padding: 5px 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 1rem;
    height: 1.5rem;
  }
`;

const Button = styled.button`
  &&& {
    padding: 8px 12px;
    border: 1px solid rgba(55, 41, 125, 0.5);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: center;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    background: #5203fc;
    font-size: 14px;
    color: white;

    min-height: 1.5rem;
    transition: all 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;

const NewConversationForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 1rem;
  padding-top: 1.5rem;
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  font-size: 0.75rem;
  opacity: 0.8;
`;
