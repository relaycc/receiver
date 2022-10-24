import { ListMessagesOptions } from '../types';

export const MOST_RECENT_MESSAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 1,
  direction: 'descending',
};

export const MOST_RECENT_PAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 20,
  direction: 'descending',
};

export const fetchPinnedAddresses = async () => {
  // TODO Implement this stub in the Web Worker implementation.
  return [];
};
