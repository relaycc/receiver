import styled from 'styled-components';
import CloseReceiverLine from '../../assets/images/close-receiver-line.svg';
import React from 'react'

interface HeaderProps {
  visible: boolean;
  toggleReceiver: () => unknown;
}

export default function ConversationsHeader({
  visible,
  toggleReceiver
}: HeaderProps) {
  return (
    <Header onClick={toggleReceiver}>
      <TextContainer>
        <MainTextContainer>
          Conversations
        </MainTextContainer>

        <SubTextContainer>
          Powered by Relay
        </SubTextContainer>
      </TextContainer>
      
      { visible && 
        <CloseContainer>
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
  background-color: #F7F7F7;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;;
  padding: 24px;
  font-family: 'Inter',sans-serif;
  z-index: 1000;
  text-align: left;
  border-radius: 20px 20px 0 0;
  
  &:hover {
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  margin-right: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MainTextContainer = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 2px;
  color: #2B2B2B;
`;

const SubTextContainer = styled.div`
  font-weight: 450;
  font-size: 12px;
  line-height: 15px;
  color: #515151;
`;

const CloseContainer = styled.div`
  position: absolute;
  right: 25px;
  top: 22px;
`;
