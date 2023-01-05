import React, { FunctionComponent, useMemo } from 'react';
import { useCurrentScreen } from '../../hooks';
import { Window } from '../Elements';
import '../../styles/preflight.css';
import '../../styles/app.css';
import {
  DirectMessage,
  Pinned,
  All,
  Groups,
  Menu,
  NoProject,
} from '../Screens';

export interface ReceiverProps {
  className?: string;
}

export const Receiver: FunctionComponent<ReceiverProps> = ({ className }) => {
  const currentScreen = useCurrentScreen();

  const screen = useMemo(() => {
    switch (currentScreen.id) {
      case 'pinned conversations':
        return <Pinned />;
      case 'all conversations':
        return <All />;
      case 'groups':
        return <Groups />;
      case 'no project':
        return <NoProject />;
      case 'menu':
        return <Menu />;
      case 'messages':
        return <DirectMessage />;
      default:
        throw new Error(
          'Unspported screen: ' + String(JSON.stringify(currentScreen))
        );
    }
  }, [currentScreen]);

  return <Window className={className}>{screen}</Window>;
};
