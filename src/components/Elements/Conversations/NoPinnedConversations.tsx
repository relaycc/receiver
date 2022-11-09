import React, { FunctionComponent, useCallback } from 'react';
import { useReceiver } from '../../../hooks';
import { Message, Handle } from '../../../domain';
import { Plus } from '../Icons';
import { InfoCard } from '../InfoCard';
import { RelayIdInput } from '../RelayIdInput';

export interface Conversation {
  peerAddress: string;
  messages: Message[];
}

export const NoPinnedConversations: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const onSubmitNewConversation = useCallback(
    (handle: Handle) => {
      dispatch({
        id: 'go to screen',
        screen: { id: 'messages', handle },
      });
    },
    [dispatch]
  );

  return (
    <>
      <RelayIdInput
        className="rr-m-10px-mt-4"
        onSubmit={onSubmitNewConversation}
        HintIcon={Plus}
      />
      <InfoCard variant="no pinned conversations" />
    </>
  );
};
