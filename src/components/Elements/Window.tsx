import React, { FunctionComponent, ReactNode } from 'react';
import '../../styles/preflight.css';
import '../../styles/app.css';

export interface WindowProps {
  className?: string;
  children: ReactNode;
}

export const Window: FunctionComponent<WindowProps> = ({
  className,
  children,
}) => {
  return (
    <div className="RelayReceiver">
      <div className={`${className} Window Container`}>{children}</div>
    </div>
  );
};
