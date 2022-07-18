import React from 'react';
import { Interpolation } from 'styled-components';
interface ContainerProps {
    buttonText: string;
    buttonStyle?: Interpolation<React.CSSProperties>;
    peerAddress?: string;
}
declare const Container: ({ buttonText, buttonStyle, peerAddress }: ContainerProps) => JSX.Element;
export default Container;
