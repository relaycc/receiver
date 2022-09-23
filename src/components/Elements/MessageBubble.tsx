import React from 'react';

interface TextBubbleProps {
  message: string;
}

const MessageBubble = ({ message }: TextBubbleProps) => {
  return (
    <div className="MessageBubble TextWrapper">
      <div className="MessageBubble MessageText">{message}</div>
    </div>
  );
};

export default MessageBubble;
