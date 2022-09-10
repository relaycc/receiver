import { useState } from 'react';
import styled from 'styled-components';
import React, { useCallback } from 'react';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
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
    <StyledInput
      placeholder="Write a Message..."
      required
      value={inputVal}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

const StyledInput = styled.input`
  &&& {
    height: 2rem !important;
    padding: 3px 0px 3px 10px;
    display: flex;
    margin: 1rem 0.5rem 1rem 0.5rem;
    margin-top: auto;

    border-radius: 6px;
    border: none;
    outline: none;
    &::placeholder {
      color: #333c4f;
      font-weight: 400;
    }
    color: #333333;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    &::placeholder {
      color: #333c4f;
    }
    box-shadow: rgb(0 0 0 / 25%) 0px 0px 4px;
  }
`;
