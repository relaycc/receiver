import { useState } from 'react';
import styled from 'styled-components';
import React, { useCallback } from 'react';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputVal, setInputVal] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (inputVal.length < 1) return;
    onSendMessage(inputVal);
    setInputVal('');
  }, [inputVal, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSend();
    },
    [handleSend]
  );

  return (
    <Container>
      <StyledInput
        placeholder="Write a Message ..."
        required
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SvgContainer
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 28 28"
        strokeWidth={1.5}
        stroke="currentColor"
        height={28}
        width={28}
        onClick={handleSend}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </SvgContainer>
    </Container>
  );
};

const Container = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0px 3px 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  gap: 20px;
  border-radius: 99rem;
  max-width: 375px;
  width: 100%;
`;

const StyledInput = styled.input`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  flex: 1;
  border-radius: 2px;
  border: none;
  outline: none;
  width: 100%;
  &::placeholder {
    letter-spacing: normal;
    margin: 0;
    padding: 0;
    font-weight: 500;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    color: #333c4f;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
  }
  color: #333333;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  
`;

const SvgContainer = styled.svg`
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  transform: translateY(1px);
  cursor: pointer;
`;

export default MessageInput;
