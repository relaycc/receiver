import { useState } from 'react';
import styled from 'styled-components';
import MessageSend from '../../assets/images/MessageSend.svg';
import React, { useCallback } from 'react';
import arrowup from '../../assets/images/arrowUp.svg'

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
        <img src={MessageSend} width={20} height={20} />
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
  padding: 5px 5px 5px 15px;
  margin-right: 10px;
  margin-left: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  gap: 20px;
  border-radius: 99rem;

  @media (max-width: 335px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border-radius: 2px;
  /* background-color: #F3F0FF; */
  border: none;
  outline: none;
  &::placeholder {
    color: #333c4f;
    font-weight: 400;
    font-family: sans-serif;
  }
  color: #333333;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;

  &::placeholder {
    color: #333c4f;
  }
`;

const SvgContainer = styled.div<StyleProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

export default MessageInput;
