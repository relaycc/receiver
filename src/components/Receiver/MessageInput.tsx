import { useState } from 'react';
import styled from 'styled-components';
import MessageSend from '../../assets/images/MessageSend.svg';
import React, { useCallback } from 'react';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputVal, setInputVal] = useState<string>('');

  const clearInput = useCallback(() => {
    setInputVal('');
  }, []);

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

  const inputTextCount = inputVal.length;

  return (
    <Container>
      <StyledInput
        placeholder="Write a Message..."
        required
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SvgContainer inputTextCount={inputTextCount} onClick={handleSend}>
        <img src={MessageSend.src} width={20} height={20} />
      </SvgContainer>
    </Container>
  );
};
interface StyleProps {
  inputTextCount: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  background: #F7F7F7;
  backdrop-filter: blur(100px);
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  gap: 20px;

  @media (max-width: 335px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border-radius: 2px;
  background-color: transparent;
  border: none;
  outline: none;
  &::placeholder {
    color: #4F5E7B;
    font-weight: 400;
    font-family: 'Roboto';
  }
  color: #333333;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const SvgContainer = styled.div<StyleProps>`
  cursor: pointer;

  &:nth-of-type(2) > :first-child > :first-child {
    stroke: ${({ inputTextCount }) =>
      inputTextCount > 0 ? '#333333' : '#4F5E7B'};
  }

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

export default MessageInput;
