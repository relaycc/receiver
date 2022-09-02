import React from 'react';
import styled from 'styled-components';
import MessageInput from '../MessageInput';

interface MessageInputFooterProps {
  onSendMessage: (message: string) => Promise<void>;
}

export function MessageInputFooter({ onSendMessage }: MessageInputFooterProps) {
  return (
    <RelayInputFooter>
      <MessageInput onSendMessage={onSendMessage} />
    </RelayInputFooter>
  );
}

const RelayInputFooter = styled.div`
  &&& {
    color: #333333;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    width: 100%;
    height: 62px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -4px 4px -4px rgba(0, 0, 0, 0.25);
    padding: 0px 10px;
    position: relative;
    z-index: 1011;
  }
`;
