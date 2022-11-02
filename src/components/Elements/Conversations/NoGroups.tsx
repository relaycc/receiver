import React, { FunctionComponent, useCallback, useState } from 'react';
import { useReceiver, useGroup } from '../../../hooks';
import { Plus } from '../Icons';
import { InfoCard } from '../InfoCard';
import { LoadingSpinner } from '../LoadingSpinner';

export const NoGroups: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const [newGroupInput, setNewGroupInput] = useState<string | null>(null);
  const [newGroupInputIsError, setNewGroupInputIsError] = useState(false);
  const { create } = useGroup();

  const onSubmitNewGroup = useCallback(() => {
    if (newGroupInput === null) {
      setNewGroupInputIsError(true);
    } else {
      create.mutate({ name: newGroupInput });
    }
  }, [newGroupInput, dispatch]);

  return (
    <>
      <form
        className="NewConversationInputForm"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitNewGroup();
        }}>
        <input
          className="NewConversationInput"
          placeholder="Enter new group info..."
          type="text"
          spellCheck="false"
          autoComplete="off"
          autoCorrect="false"
          autoCapitalize="false"
          value={create.isLoading ? 'Creating group...' : newGroupInput || ''}
          onChange={(e) => {
            e.preventDefault();
            setNewGroupInput(e.target.value);
            setNewGroupInputIsError(false);
          }}
        />
        {create.isLoading && (
          <div className="NewConversationInput NewGroupSpinner">
            <LoadingSpinner />
          </div>
        )}
        {create.isLoading || (
          <Plus
            onClick={onSubmitNewGroup}
            className="NewConversationInput Plus"
          />
        )}
        {newGroupInputIsError && (
          <p className="NewConversationInput ErrorMessage">
            {"Group name field can't be empty."}
          </p>
        )}
      </form>
      <InfoCard variant="no groups" />
    </>
  );
};
