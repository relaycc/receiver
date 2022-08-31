import React, { useContext, useEffect, useState } from "react";
import styled, { Interpolation } from "styled-components";
import smallLogo from "../../assets/images/smallLogo.png";
import ReceiverContext from "./ReceiverContext";

interface ButtonProps {
  launchText: string;
  inlineLaunch: boolean;
  peerAddress?: string;
  as?: string | React.ComponentType<any>;
  launchButtonStyle?: Interpolation<React.CSSProperties>;
}

const ReceiverLaunch = ({
  peerAddress = "0x45c9a201e2937608905fef17de9a67f25f9f98e0",
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
      onClick={() => receiverContext.toggle()}
    ></InlineLogo>
  ) : (
    <ButtonElem
      onClick={() => receiverContext.toggle()}
      as={as}
      style={launchButtonStyle}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#5203fc"
        height={'24px'}
        width={'24px'}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    </ButtonElem>
  );
};

const InlineLogo = styled.div<ButtonProps>`
  background-image: url("${smallLogo}");
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
  background: white;
  border: none;
  border-radius: 50%;
  font-style: normal;
  padding: 12px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 80px;
  right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.45);
  ${({ launchButtonStyle }) => launchButtonStyle};

  &:hover {
    cursor: pointer;
  }
`;

export default ReceiverLaunch;
