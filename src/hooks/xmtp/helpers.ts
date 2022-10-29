import { ListMessagesOptions, XmtpApi } from '../types';

export const MOST_RECENT_MESSAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 1,
  direction: 'descending',
};

export const MOST_RECENT_PAGE_OPTIONS: Partial<ListMessagesOptions> = {
  limit: 20,
  direction: 'descending',
};

export const PINNED_ADDRESS = '0x7239BA0AA4E14a437bbd0c30926Ac47Afa756A08';
export const IGNORED_ADDRESS = '0x6722C94979d942CFcF1EB0748AA883660c42c0F4';

export const fetchPinnedAddresses = async (client: XmtpApi) => {
  const arrayWithMessage = await client.fetchMessages(
    PINNED_ADDRESS,
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

export const pinAddress = async (client: XmtpApi, peerAddress: string) => {
  const pinnedAddresses = await fetchPinnedAddresses(client);
  if (pinnedAddresses.includes(peerAddress)) {
    return;
  } else {
    const newPinnedAddresses = [...pinnedAddresses, peerAddress];
    const message = JSON.stringify(newPinnedAddresses);
    return client.sendMessage(PINNED_ADDRESS, message);
  }
};

export const unpinAddress = async (client: XmtpApi, peerAddress: string) => {
  const pinnedAddresses = await fetchPinnedAddresses(client);
  if (!pinnedAddresses.includes(peerAddress)) {
    return;
  } else {
    const newPinnedAddresses = pinnedAddresses.filter(
      (address) => address !== peerAddress
    );
    const message = JSON.stringify(newPinnedAddresses);
    return client.sendMessage(PINNED_ADDRESS, message);
  }
};

export const fetchIgnoredAddresses = async (client: XmtpApi) => {
  const arrayWithMessage = await client.fetchMessages(
    IGNORED_ADDRESS,
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

export const ignoreAddress = async (client: XmtpApi, peerAddress: string) => {
  const ignoredAddresses = await fetchIgnoredAddresses(client);
  if (ignoredAddresses.includes(peerAddress)) {
    return;
  } else {
    const newIgnoredAddresses = [...ignoredAddresses, peerAddress];
    const message = JSON.stringify(newIgnoredAddresses);
    return client.sendMessage(IGNORED_ADDRESS, message);
  }
};

export const unignoreAddress = async (client: XmtpApi, peerAddress: string) => {
  const ignoredAddresses = await fetchIgnoredAddresses(client);
  if (!ignoredAddresses.includes(peerAddress)) {
    return;
  } else {
    const newIgnoredAddresses = ignoredAddresses.filter(
      (address) => address !== peerAddress
    );
    const message = JSON.stringify(newIgnoredAddresses);
    return client.sendMessage(IGNORED_ADDRESS, message);
  }
};
