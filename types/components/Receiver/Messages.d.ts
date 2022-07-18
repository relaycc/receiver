/// <reference types="react" />
interface MessagesProps {
    providedPeerAddress?: string;
    onXmptReady: () => unknown;
}
declare const Messages: ({ providedPeerAddress, onXmptReady }: MessagesProps) => JSX.Element;
export default Messages;
