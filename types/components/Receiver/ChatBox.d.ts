/// <reference types="react" />
import { Interpolation } from 'styled-components';
interface ChatButtonProps {
    visible: boolean;
    as?: string | React.ComponentType<any>;
    style?: Interpolation<React.CSSProperties>;
    peerAddress?: string;
    headerText?: string;
    onCloseReceiver: () => unknown;
}
declare const ChatBox: ({ style, visible, as, peerAddress, headerText, onCloseReceiver }: ChatButtonProps) => JSX.Element;
export default ChatBox;
