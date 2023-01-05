import React, { FunctionComponent, ReactNode } from 'react';
import { Header } from './Header';

export interface ThreeColumnHeaderProps {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  title: string;
}

export const ThreeColumnHeader: FunctionComponent<ThreeColumnHeaderProps> = ({
  leftIcon,
  rightIcon,
  title,
}) => {
  return (
    <Header>
      {leftIcon}
      <h1 className="Header Title">{title}</h1>
      {rightIcon}
    </Header>
  );
};
