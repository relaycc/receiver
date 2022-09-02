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
        placeholder="Write a Message..."
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
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0px 3px 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    gap: 20px;
    border-radius: 99rem;
    width: 100%;
  }
`;

const StyledInput = styled.input`
  &&& {
    flex: 1;
    border-radius: 2px;
    /* background-color: #F3F0FF; */
    border: none;
    outline: none;
    &::placeholder {
      color: #333c4f;
      font-weight: 400;
      font-family: 'Poppins', sans-serif;
    }
    color: #333333;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    &::placeholder {
      color: #333c4f;
    }
  }
`;

const SvgContainer = styled.svg`
  &&& {
    transform: translateY(1px);
  }
`;

export default MessageInput;
