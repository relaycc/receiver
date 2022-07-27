import styled from 'styled-components';
import CloseReceiverLine from '../../assets/images/close-receiver-line.svg';
import React from 'react'

interface HeaderProps {
  text?: string;
  visible: boolean;
  closeReceiver: () => unknown;
}

export default function RelayHeader({
  text = 'Welcome to DaoPanel Receiver',
  visible,
  closeReceiver
}: HeaderProps) {
  return (
    <Header>
       <TextContainer>
          {text}
       </TextContainer>
      
      { visible && 
        <CloseContainer onClick={closeReceiver}>
          <img
            src={CloseReceiverLine}
            width={22}
            height={20}
            alt="relay"
          />
        </CloseContainer>
    }

    </Header>
  );
}

const Header = styled.div`
  background-color: #5A46C6;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 10px 24px;
  font-family: Inter;
  height: 62px;
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

const TextContainer = styled.div`
  padding-top: 15px;
`;

const CloseContainer = styled.div`
  position: absolute;
  right: 25px;
  top: 22px;
  &:hover {
    cursor: pointer;
  }
`;
