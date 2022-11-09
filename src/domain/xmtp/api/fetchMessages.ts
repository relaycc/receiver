import {
  XmtpClient,
  EthAddress,
  IGNORED_ADDRESS,
  GROUPS_ADDRESS,
  PINNED_ADDRESS,
  PinnedAddresses,
  IgnoredAddresses,
  Groups,
  ListMessagesOptions,
  isPinnedAddresses,
  isIgnoredAddresses,
  isGroups,
} from '../..';

export const MOST_RECENT_MESSAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 1,
  direction: 'descending',
};

export const MOST_RECENT_PAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 20,
  direction: 'descending',
};

export const fetchPinnedAddresses = async (
  clientAddress: EthAddress,
  client: XmtpClient
): Promise<PinnedAddresses> => {
  try {
    const messages = await client.fetchMessages(
      clientAddress,
      PINNED_ADDRESS,
      MOST_RECENT_MESSAGE_OPTIONS
    );
    const mostRecentMessage = messages[0];
    if (!isPinnedAddresses(mostRecentMessage.content)) {
      return { addresses: [] };
    } else {
      return mostRecentMessage.content;
    }
  } catch (error) {
    return { addresses: [] };
  }
};

export const fetchIgnoredAddresses = async (
  clientAddress: EthAddress,
  client: XmtpClient
): Promise<IgnoredAddresses> => {
  try {
    const messages = await client.fetchMessages(
      clientAddress,
      IGNORED_ADDRESS,
      MOST_RECENT_MESSAGE_OPTIONS
    );
    const mostRecentMessage = messages[0];
    if (!isIgnoredAddresses(mostRecentMessage.content)) {
      return { addresses: [] };
    } else {
      return mostRecentMessage.content;
    }
  } catch (error) {
    return { addresses: [] };
  }
};

export const fetchGroups = async (
  clientAddress: EthAddress,
  client: XmtpClient
): Promise<Groups> => {
  try {
    const messages = await client.fetchMessages(
      clientAddress,
      GROUPS_ADDRESS,
      MOST_RECENT_MESSAGE_OPTIONS
    );
    const mostRecentMessage = messages[0];
    if (!isGroups(mostRecentMessage.content)) {
      return { groups: {} };
    } else {
      return mostRecentMessage.content;
    }
  } catch (error) {
    return { groups: {} };
  }
};

export const fetchMessages = async (
  clientAddress: EthAddress,
  peerAddress: EthAddress,
  client: XmtpClient,
  opts?: Partial<ListMessagesOptions>
) => {
  return client.fetchMessages(clientAddress, peerAddress, opts);
};
