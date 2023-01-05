import React from 'react';
import { ThreeColumnHeader } from '../../Elements';
import { InfoCard } from '../../Elements';
import { useSetClosed, useGoToMenu } from '../../../hooks';
import { GoToConversationsIcon, ExitIcon } from '../../Elements';

export const NoProject = () => {
  const setClosed = useSetClosed();
  const goToMenu = useGoToMenu();
  return (
    <>
      <ThreeColumnHeader
        leftIcon={<GoToConversationsIcon onClick={goToMenu} />}
        title="Project Not Connected"
        rightIcon={<ExitIcon onClick={setClosed} />}
      />
      <InfoCard variant="no project" />
    </>
  );
};
