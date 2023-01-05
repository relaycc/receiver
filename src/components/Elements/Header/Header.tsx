import React, { FunctionComponent, ReactNode } from 'react';

export interface HeaderProps {
  children: ReactNode;
}

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  return <div className="Header HeaderWrapper">{children}</div>;
};
