import React from 'react';

interface TextBubbleProps {
  message: string;
}

const MessageBubble = ({ message }: TextBubbleProps) => {
  return (
    <div className="textWrapper">
      <div className="messageText">{message}</div>
    </div>
  );
};

export default MessageBubble;
