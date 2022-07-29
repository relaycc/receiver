import React, { useState } from 'react';
import styled from 'styled-components';
import { Interpolation } from 'styled-components';
import ChatBox from './ChatBox';
import LaunchButton from './LaunchButton';
import CSS from 'csstype';
import { Signer } from 'ethers';

interface ContainerProps {
  buttonText?: string;
  inlineLaunchLogo?: boolean;
  launchButtonStyle?: Interpolation<React.CSSProperties>;
  receiverContainerStyle?: Interpolation<React.CSSProperties>;
  peerAddress?: string;
  signer?: Signer;
}

const Receiver = ({ buttonText = '', inlineLaunchLogo = false, launchButtonStyle, receiverContainerStyle, peerAddress, signer }: ContainerProps) => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);

  const toggle = () => {
    setShowBox(!showBox);
    if (!hasLaunched) setHasLaunched(true);
  };

  const chatBoxContainerStyle:CSS.Properties = {
    maxHeight: showBox ? '480px' : (hasLaunched ? '62px' : '0px'),
    height: '480px', 
    position: 'fixed', 
    bottom: '0px', 
    right: '150px',
    transition: 'max-height 0.25s ease-in',
    zIndex: 1000
  }

  return (
    <Container>
      <LaunchButton inlineLogo={inlineLaunchLogo} onClick={toggle} text={buttonText} style={launchButtonStyle}></LaunchButton>
      <div style={chatBoxContainerStyle}>
        <ChatBox isUserConnected={signer != undefined} style={receiverContainerStyle} toggleReceiver={toggle} peerAddress={peerAddress} visible={showBox}></ChatBox>
      </div>
    </Container>
  );
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap');
`;

export default Receiver;
