import React, { FunctionComponent } from 'react';
import { useGoToMenu, useSetClosed } from '../../../hooks';
import { InfoCard } from '../../Elements/InfoCard';
import {
  ThreeColumnHeader,
  GoToConversationsIcon,
  ExitIcon,
} from '../../Elements';

export const NoGroups: FunctionComponent = () => {
  const goToMenu = useGoToMenu();
  const setClosed = useSetClosed();

  return (
    <>
      <ThreeColumnHeader
        leftIcon={<GoToConversationsIcon onClick={goToMenu} />}
        rightIcon={<ExitIcon onClick={setClosed} />}
        title={'Groups'}
      />
      <InfoCard variant="no groups" />
    </>
  );
};
