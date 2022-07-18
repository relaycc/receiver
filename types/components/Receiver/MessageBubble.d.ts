/// <reference types="react" />
interface TextBubbleProps {
    message: string;
    sentByMe: boolean;
}
declare const MessageBubble: (props: TextBubbleProps) => JSX.Element;
export default MessageBubble;
