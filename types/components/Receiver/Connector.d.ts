/// <reference types="react" />
interface ConnectorProps {
    hoverLogo: string;
    name: string;
    onClick: () => unknown;
    connectState?: 'connecting' | 'connected';
}
export default function Connector(props: ConnectorProps): JSX.Element;
export {};
