import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Interpolation } from 'styled-components';
import LaunchButton from './LaunchButton';
import { ReceiverContext } from "../ReceiverConfig";

interface ContainerProps {
  buttonText?: string;
  inlineLaunchLogo?: boolean;
  peerAddress?: string;
  launchButtonStyle?: Interpolation<React.CSSProperties>;
  toggle: () => void;
}
const Receiver = ({ peerAddress = '0xe7925D190aea9279400cD9a005E33CEB9389Cc2b', buttonText = '', inlineLaunchLogo = false, launchButtonStyle }: ContainerProps) => {
  const receiverContext = useContext(ReceiverContext);
  receiverContext.setPeerAddress(peerAddress);
  
  return (
    <Container>
      <LaunchButton inlineLogo={inlineLaunchLogo} onClick={ receiverContext.toggle } text={buttonText} style={launchButtonStyle}></LaunchButton>
    </Container>
  );
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap');
`;

export default Receiver;
