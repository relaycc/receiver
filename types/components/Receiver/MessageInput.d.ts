/// <reference types="react" />
interface MessageInputProps {
    onSendMessage: (val: string) => unknown;
}
declare const MessageInput: ({ onSendMessage }: MessageInputProps) => JSX.Element;
export default MessageInput;
