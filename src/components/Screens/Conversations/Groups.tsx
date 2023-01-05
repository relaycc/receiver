import React, { FunctionComponent } from 'react';
import { GroupListView, GroupConversation } from './GroupListView';
import { LoadingList } from '../../Elements/LoadingList';
import { NoGroups } from '../GroupChat/Groups';

export const Groups: FunctionComponent = () => {
  const groupsPreviews: { isLoading: boolean }[] = [];
  const groupsIsLoading = Boolean(groupsPreviews.find((pq) => pq.isLoading));

  const conversationsProps: GroupConversation[] = [];

  if (groupsIsLoading) {
    return <LoadingList />;
  } else if (conversationsProps.length === 0) {
    return <NoGroups />;
  } else {
    return <GroupListView conversations={conversationsProps} />;
  }
};
