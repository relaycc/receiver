import { ListMessagesOptions } from '@relaycc/xmtp-js';
import { messageApi } from '@xmtp/proto';

export const MOST_RECENT_MESSAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 1,
  direction: messageApi.SortDirection.SORT_DIRECTION_DESCENDING,
};

export const MOST_RECENT_PAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 20,
  direction: messageApi.SortDirection.SORT_DIRECTION_DESCENDING,
};
