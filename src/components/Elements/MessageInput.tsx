import React, { useCallback, useState } from 'react';
import { Send } from './Icons/Send';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
  onEnterPressed?: () => unknown;
}

export const MessageInput = ({
  onSendMessage,
  onEnterPressed,
}: MessageInputProps) => {
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
      if (e.key === 'Enter') {
        onEnterPressed && onEnterPressed();
      }
    },
    []
  );

  return (
    <form
      className="MessageInput InputForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}>
      <input
        className="InputField"
        autoFocus={true}
        placeholder="Write a Message..."
        type="text"
        required
        spellCheck="false"
        autoComplete="off"
        autoCorrect="false"
        autoCapitalize="false"
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Send onClick={handleSend} className="Send" />
    </form>
  );
};
