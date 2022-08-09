import React, { useState } from 'react';
import ChatBox from './ChatBox';
import CSS from 'csstype';
import ReceiverContext from './ReceiverContext';
import styled from 'styled-components';
import { Signer } from 'ethers';
import { Interpolation } from 'styled-components';

interface ReceiverContainerProps {
  children: React.ReactNode;
  signer?: Signer;
  receiverContainerStyle?: Interpolation<React.CSSProperties>;
}

const ReceiverContainer = ({ signer, children, receiverContainerStyle }: ReceiverContainerProps) => {
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
    <ReceiverContext.Provider value={{ toggle: toggle }}>
      <Container>
        <div style={chatBoxContainerStyle}>
          <ChatBox  isUserConnected={signer != undefined} style={receiverContainerStyle} toggleReceiver={toggle} visible={showBox}></ChatBox>
        </div>
      </Container>
      { children }
    </ReceiverContext.Provider>
  );
};


const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap');
`;


export default ReceiverContainer;
