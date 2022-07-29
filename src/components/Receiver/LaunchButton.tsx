import React from 'react';
import styled, { Interpolation } from 'styled-components';
import Logo from '../../assets/images/logo2.svg';

interface ButtonProps {
  text: string;
  inlineLogo: boolean;
  onClick: () => unknown;
  as?: string | React.ComponentType<any>;
  style?: Interpolation<React.CSSProperties>;
}

const LaunchButton = ({ inlineLogo, text, style, as, onClick }: ButtonProps) => {
  return (
    inlineLogo ? (
      <InlineLogo as={as} style={style} onClick={() => onClick()}>
      </InlineLogo>
    ) : (
      <ButtonElem onClick={() => onClick()} as={as} style={style}>
        { text }
      </ButtonElem>
    )
  );
};

const InlineLogo = styled.div<ButtonProps>`
  background-image: url("${Logo}");
  height: 30px;
  width: 30px;
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  ${({ style }) => style };

  &:hover {
    cursor: pointer;
  }
`;

const ButtonElem = styled.button<ButtonProps>`
  background-color: #5A46C6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  letter-spacing: .1em;
  position: fixed;
  bottom: 80px;
  right: 20px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  padding: 8px 12px;
  border: 1px solid rgba(55, 41, 125, 0.5);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  ${({ style }) => style };

  &:hover {
    cursor: pointer;
  }
`;

export default LaunchButton;
