<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
import styled, { Interpolation } from 'styled-components';
import ReceiverContext from './ReceiverContext';
=======
import React, { useContext, useEffect, useState } from "react";
import styled, { Interpolation } from "styled-components";
import smallLogo from "../../assets/images/smallLogo.png";
import ReceiverContext from "./ReceiverContext";
>>>>>>> main


interface ButtonProps {
  launchText: string;
  inlineLaunch: boolean;
  peerAddress?: string;
  as?: string | React.ComponentType<any>;
  launchButtonStyle?: Interpolation<React.CSSProperties>;
}

const ReceiverLaunch = ({
<<<<<<< HEAD
  peerAddress = '0x45c9a201e2937608905fef17de9a67f25f9f98e0',
=======
  peerAddress = "0x45c9a201e2937608905fef17de9a67f25f9f98e0",
>>>>>>> main
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
<<<<<<< HEAD
      onClick={() => receiverContext.toggle()}></InlineLogo>
  ) : (
    <ButtonElem
      onClick={() => receiverContext.toggle()}
      as={as}
      style={launchButtonStyle}>
      {launchText}
    </ButtonElem>
=======
      onClick={() => receiverContext.toggle()}
    ></InlineLogo>
  ) : (
      <ButtonElem
        onClick={() => receiverContext.toggle()}
        as={as}
        style={launchButtonStyle}
      >
        {launchText}
      </ButtonElem>
>>>>>>> main
  );
};

const InlineLogo = styled.div<ButtonProps>`
<<<<<<< HEAD
  background-image: url('https://relay-receiver-prod.s3.amazonaws.com/smallLogo.png');
=======
  background-image: url("${smallLogo}");
>>>>>>> main
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

const ButtonElem = styled.button<ButtonProps>`
  background: #5203fc;
  font-size: 14px;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  font-size: 16px;
<<<<<<< HEAD
  font-family: 'Poppins', sans-serif;
=======
  font-family: "Poppins", sans-serif;
>>>>>>> main
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
<<<<<<< HEAD
  font-family: 'Poppins', sans-serif;
=======
  font-family: "Poppins", sans-serif;
>>>>>>> main

  &:hover {
    cursor: pointer;
  }
`;


export default ReceiverLaunch;
