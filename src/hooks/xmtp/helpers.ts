import { Client, ListMessagesOptions } from '@relaycc/xmtp-js';
import { messageApi } from '@xmtp/proto';
import { fetchMessages } from './primitives';

export const MOST_RECENT_MESSAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 1,
  direction: messageApi.SortDirection.SORT_DIRECTION_DESCENDING,
};

export const MOST_RECENT_PAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 20,
  direction: messageApi.SortDirection.SORT_DIRECTION_DESCENDING,
};

export const fetchPinnedAddresses = async (client: Client) => {
  const arrayWithMessage = await fetchMessages(
    client,
    '0xc8f907C6387e0989E75E06EDd2bfc3516806E358',
    MOST_RECENT_MESSAGE_OPTIONS
  );

  if (arrayWithMessage.length === 0) {
    return [];
  } else {
    const message = arrayWithMessage[0];
    try {
      return JSON.parse(message.content) as string[];
    } catch {
      return [];
    }
  }
};
