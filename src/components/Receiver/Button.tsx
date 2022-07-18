import React from 'react';
import styled, { Interpolation } from 'styled-components';

interface ButtonProps {
  text: string;
  onClick: () => unknown;
  as?: string | React.ComponentType<any>;
  style?: Interpolation<React.CSSProperties>;
}

const Button = ({ text, style, as, onClick }: ButtonProps) => {
  return (
    <div>
      <ButtonElem onClick={() => onClick()} as={as} style={style}>
        { text }
      </ButtonElem>
    </div>
  );
};

const ButtonElem = styled.button<ButtonProps>`
  ${({ style }) => style };
  background-color: ${({ theme }) => theme.colors.purple };
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  letter-spacing: .1em;
  position: fixed;
  bottom: 60px;
  right: 30px;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
