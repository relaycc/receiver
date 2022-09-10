import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useReceiver } from '../../../hooks';

export const Conversations: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  return (
    <Header>
      <Title>Conversations</Title>
      <TopButton
        onClick={() =>
          dispatch({ id: 'go to screen', screen: { id: 'new conversation' } })
        }>
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
        <ButtonText>New Conversation</ButtonText>
      </TopButton>
    </Header>
  );
};

const Header = styled.div`
  &&& {
    text-align: left;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
    color: black;
    height: 62px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    z-index: 1011;
    background-color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  color: black;
  font-weight: 400;
  text-align: bottom;
`;

const TopButton = styled.button`
  &&& {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    padding: 5px 8px;
    display: flex;
    margin: 0.5rem;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    border-radius: 4px;
    white-space: nowrap;
    border: none;
    background-color: white;
    cursor: pointer;
    margin-left: auto;
  }
`;

const ButtonText = styled.span`
  &&& {
    font-weight: bold;
  }
`;
