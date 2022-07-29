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
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  font-family: 'Inter', sans-serif;;
  padding: 24px;
  font-family: 'Inter',sans-serif;
  z-index: 1000;
  text-align: left;
  border-radius: 8px 8px 0 0;
`;

const TextContainer = styled.div`
  margin-right: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CloseContainer = styled.div`
  position: absolute;
  right: 25px;
  top: 22px;
  &:hover {
    cursor: pointer;
  }
`;
