import React from 'react';
import { Interpolation } from 'styled-components';
interface ButtonProps {
    text: string;
    onClick: () => unknown;
    as?: string | React.ComponentType<any>;
    style?: Interpolation<React.CSSProperties>;
}
declare const Button: ({ text, style, as, onClick }: ButtonProps) => JSX.Element;
export default Button;
