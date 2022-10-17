import React, { useCallback, useState } from 'react';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
  setIsEnterPressed: (e: boolean) => unknown;
  isEnterPressed: boolean;
}

export const MessageInput = ({
  onSendMessage,
  setIsEnterPressed,
  isEnterPressed,
}: MessageInputProps) => {
  const [inputVal, setInputVal] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (inputVal.length < 1) return;
    onSendMessage(inputVal);
    setInputVal('');
    setIsEnterPressed(!isEnterPressed);
  }, [inputVal, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSend();
    },
    [handleSend]
  );

  return (
    <input
      className="MessageInput StyledInput"
      placeholder="Write a Message..."
      required
      value={inputVal}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
