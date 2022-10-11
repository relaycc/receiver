import React, { FunctionComponent, useState, useCallback } from 'react';
import { useRelay, usePinnedAddresses } from '../../hooks';
import { PinnedConversationListItem } from './PinnedConversationListItem';

export const PinnedConversationList: FunctionComponent = () => {
  const client = useRelay((state) => state.client);
  const pinnedAddresses = usePinnedAddresses(client);
  const [, setTimestamps] = useState<Record<string, Date>>({});

  const setTimestamp = useCallback((address: string, date: Date) => {
    return setTimestamps((prev) => {
      return {
        ...prev,
        [address]: date,
      };
    });
  }, []);

  if (pinnedAddresses.data === undefined) {
    return <h1>Loading</h1>;
  } else {
    return (
      <ul className="ConversationList List">
        {deduplicated(pinnedAddresses.data).map((address) => (
          <PinnedConversationListItem
            key={address}
            peerAddress={address}
            onLoad={(date: Date) => setTimestamp(address, date)}
          />
        ))}
      </ul>
    );
  }
};

const deduplicated = (strings: string[]) => {
  const uniq: Record<string, string> = {};
  for (const str of strings) {
    uniq[str] = str;
  }
  return Object.keys(uniq);
};
