import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReceiverContext from './ReceiverContext';

interface ButtonProps {
  launchText: string;
  inlineLaunch: boolean;
  peerAddress?: string;
  /* TODO We're getting rid of styled components, so this should go away. */
  /* eslint-disable-next-line */
  as: any;
  /* TODO We're getting rid of styled components, so this should go away. */
  /* eslint-disable-next-line */
  launchButtonStyle?: any;
}

export const InlineLaunch = ({
  peerAddress = '0x45c9a201e2937608905fef17de9a67f25f9f98e0',
  inlineLaunch,
  launchText,
  launchButtonStyle,
  as,
}: ButtonProps) => {
  const receiverContext = useContext(ReceiverContext);

  useEffect(() => {
    receiverContext.setPeerAddress(peerAddress);
  }, []);

  return inlineLaunch ? (
    <InlineLogo
      as={as}
      style={launchButtonStyle}
      onClick={() => receiverContext.toggle()}></InlineLogo>
  ) : (
    <ButtonElem
      onClick={() => receiverContext.toggle()}
      as={as}
      style={launchButtonStyle}>
      {launchText}
    </ButtonElem>
  );
};

/* TODO This will go away when we remove styled components */
/* eslint-disable-next-line */
const InlineLogo = styled.div<{ launchButtonStyle: any }>`
  letter-spacing: normal;
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  background-image: url('https://relay-receiver-prod.s3.amazonaws.com/smallLogo.png');
  height: 30px;
  width: 30px;
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  ${({ launchButtonStyle }) => launchButtonStyle};

  &:hover {
    cursor: pointer;
  }
`;

/* TODO This will go away when we remove styled components */
/* eslint-disable-next-line */
const ButtonElem = styled.button<{ launchButtonStyle: any }>`
  letter-spacing: normal;
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  background: #5203fc;
  font-size: 14px;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  line-height: 15px;
  padding: 8px 12px;
  position: fixed;
  bottom: 80px;
  right: 20px;
  border: 1px solid rgba(55, 41, 125, 0.5);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  ${({ launchButtonStyle }) => launchButtonStyle};
  letter-spacing: normal;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`;
