import React, { FunctionComponent, useMemo } from 'react';
import { useGroupsPreviews, useWalletAddress } from '../../../hooks';
import { GroupListView, GroupConversation } from './GroupListView';
import { LoadingList } from '../LoadingList';
import { NoGroups } from './NoGroups';

export const Groups: FunctionComponent = () => {
  const walletAddress = useWalletAddress();
  const groupsPreviews = useGroupsPreviews(walletAddress);
  const groupsIsLoading = Boolean(groupsPreviews.find((pq) => pq.isLoading));

  const conversationsProps: GroupConversation[] = useMemo(() => {
    return groupsPreviews
      .filter((cp) => cp.data && cp.data.messages.length > 0)
      .map((cp) => cp.data)
      .sort((a, b) => {
        if (a === undefined) return 1;
        if (b === undefined) return -1;
        if (a.messages[0] === undefined) return 1;
        if (b.messages[0] === undefined) return -1;
        if (a.messages[0].sent === undefined) return 1;
        if (b.messages[0].sent === undefined) return 1;
        return a.messages[0].sent.getTime() < b.messages[0].sent.getTime()
          ? 1
          : -1;
      }) as GroupConversation[];
  }, [groupsPreviews]);

  if (groupsIsLoading) {
    return <LoadingList />;
  } else if (conversationsProps.length === 0) {
    return <NoGroups />;
  } else {
    return <GroupListView conversations={conversationsProps} />;
  }
};
