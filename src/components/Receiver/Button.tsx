import styled from 'styled-components';
import React from 'react'

export interface ButtonProps {
  text: string;
  onClick?: () => void;
}
export default function Button({text, onClick}: ButtonProps) {
  return (
    <ButtonContainer onClick={onClick}>
      {text}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  padding: 8px 12px;
  background: #5A46C6;
  border: 1px solid rgba(55, 41, 125, 0.5);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  align-self: center;

  &:hover {
    cursor: pointer;
  }
`;
