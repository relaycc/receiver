/// <reference types="react" />
interface HeaderProps {
    text?: string;
    showLinks?: boolean;
    onCloseReceiver?: () => unknown;
}
export default function RelayHeader({ text, showLinks, onCloseReceiver }: HeaderProps): JSX.Element;
export {};
