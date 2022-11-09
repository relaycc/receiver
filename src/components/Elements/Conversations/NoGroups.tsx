import React, { FunctionComponent, useCallback } from 'react';
import { useGroup } from '../../../hooks';
import { Plus } from '../Icons';
import { InfoCard } from '../InfoCard';
import { RelayGroupNameInput } from '../RelayGroupNameInput';

export const NoGroups: FunctionComponent = () => {
  const { create } = useGroup();

  const onSubmitNewGroup = useCallback(
    (name: string) => {
      create.mutate({ name });
    },
    [create]
  );

  return (
    <>
      <RelayGroupNameInput
        className="rr-m-10px-mt-4"
        onSubmit={onSubmitNewGroup}
        HintIcon={Plus}
        onSubmitIsRunning={create.isLoading}
        onSubmitIsSuccess={create.isSuccess}
      />
      <InfoCard variant="no groups" />
    </>
  );
};
