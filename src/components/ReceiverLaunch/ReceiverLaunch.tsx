import React, { useContext, useEffect } from 'react';
import styled, { Interpolation } from 'styled-components';
import Logo from '../../assets/images/logo2.svg';
import ReceiverContext from "../ReceiverContext";
import { receiverStore } from '../../store';
import { getAddress } from '@ethersproject/address'
import { useEnsName } from 'wagmi';

interface ButtonProps {
  launchText: string;
  inlineLaunch: boolean;
  peerAddress?: string;
  as?: string | React.ComponentType<any>;
  launchButtonStyle?: Interpolation<React.CSSProperties>;
}

// This is the component used to launch the receiver.
const ReceiverLaunch = ({ peerAddress = '0x45c9a201e2937608905fef17de9a67f25f9f98e0', inlineLaunch, launchText, launchButtonStyle, as }: ButtonProps) => {
  const receiverContext = useContext(ReceiverContext);
  const { setPeerAddress } = receiverStore();
  const formattedAddress = getAddress(peerAddress)
  const { data: ensName } = useEnsName({
    address: formattedAddress,
  })    
  
  useEffect(() => {
    ensName ? setPeerAddress(formattedAddress, ensName) : setPeerAddress(formattedAddress, '');
  }, [formattedAddress])
  

  const handleToggle = () => {
    receiverContext.toggle();
  }


  return (
    inlineLaunch ? (
      <InlineLogo as={as} style={launchButtonStyle} onClick={ handleToggle }>
      </InlineLogo>
    ) : (
      <ButtonElem onClick={ handleToggle } as={as} style={launchButtonStyle}>
        { launchText }
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
  ${({ launchButtonStyle }) => launchButtonStyle };

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
  ${({ launchButtonStyle }) => launchButtonStyle };

  &:hover {
    cursor: pointer;
  }
`;

export default ReceiverLaunch;
