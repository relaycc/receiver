import {
  CreateGroupOptions,
  ListMessagesOptions,
  XmtpApi,
  Group,
} from '../types';

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
export const GROUPS_ADDRESS = '0x4B5B5EFe6dfBF2ECFD55eA9cE3108977Fc9cfc5F';

export const fetchPinnedAddresses = async (
  clientAddress: string,
  client: XmtpApi
) => {
  const arrayWithMessage = await client.fetchMessages(
    clientAddress,
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

export const pinAddress = async (
  clientAddress: string,
  client: XmtpApi,
  peerAddress: string
) => {
  const pinnedAddresses = await fetchPinnedAddresses(clientAddress, client);
  if (pinnedAddresses.includes(peerAddress)) {
    return;
  } else {
    const newPinnedAddresses = [...pinnedAddresses, peerAddress];
    const message = JSON.stringify(newPinnedAddresses);
    return client.sendMessage(clientAddress, PINNED_ADDRESS, message);
  }
};

export const unpinAddress = async (
  clientAddress: string,
  client: XmtpApi,
  peerAddress: string
) => {
  const pinnedAddresses = await fetchPinnedAddresses(clientAddress, client);
  if (!pinnedAddresses.includes(peerAddress)) {
    return;
  } else {
    const newPinnedAddresses = pinnedAddresses.filter(
      (address) => address !== peerAddress
    );
    const message = JSON.stringify(newPinnedAddresses);
    return client.sendMessage(clientAddress, PINNED_ADDRESS, message);
  }
};

export const fetchIgnoredAddresses = async (
  clientAddress: string,
  client: XmtpApi
) => {
  const arrayWithMessage = await client.fetchMessages(
    clientAddress,
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

export const ignoreAddress = async (
  clientAddress: string,
  client: XmtpApi,
  peerAddress: string
) => {
  const ignoredAddresses = await fetchIgnoredAddresses(clientAddress, client);
  if (ignoredAddresses.includes(peerAddress)) {
    return;
  } else {
    const newIgnoredAddresses = [...ignoredAddresses, peerAddress];
    const message = JSON.stringify(newIgnoredAddresses);
    return client.sendMessage(clientAddress, IGNORED_ADDRESS, message);
  }
};

export const unignoreAddress = async (
  clientAddress: string,
  client: XmtpApi,
  peerAddress: string
) => {
  const ignoredAddresses = await fetchIgnoredAddresses(clientAddress, client);
  if (!ignoredAddresses.includes(peerAddress)) {
    return;
  } else {
    const newIgnoredAddresses = ignoredAddresses.filter(
      (address) => address !== peerAddress
    );
    const message = JSON.stringify(newIgnoredAddresses);
    return client.sendMessage(clientAddress, IGNORED_ADDRESS, message);
  }
};

export const fetchGroups = async (clientAddress: string, client: XmtpApi) => {
  const arrayWithMessage = await client.fetchMessages(
    clientAddress,
    GROUPS_ADDRESS,
    MOST_RECENT_MESSAGE_OPTIONS
  );

  if (arrayWithMessage.length === 0) {
    return {};
  } else {
    const message = arrayWithMessage[0];
    try {
      return JSON.parse(message.content) as Record<string, Group>;
    } catch {
      return {};
    }
  }
};

export const createGroup = async (
  clientAddress: string,
  client: XmtpApi,
  options?: Partial<CreateGroupOptions>
): Promise<{ created: Group; groups: Record<string, Group> }> => {
  const identity = await client.createIdentity();
  const group = { ...options, wallet: identity };
  const groups = await fetchGroups(clientAddress, client);
  const newGroups = { ...groups, [group.wallet.wallet.address]: group };
  await client.sendMessage(
    clientAddress,
    GROUPS_ADDRESS,
    JSON.stringify(newGroups, null, 2)
  );
  await client.startClient(group.wallet, { env: 'production' });
  return {
    created: group,
    groups: newGroups,
  };
};

export const leaveGroup = async (
  clientAddress: string,
  client: XmtpApi,
  peerAddress: string
) => {
  const groups = await fetchGroups(clientAddress, client);
  const newGroups = { ...groups };
  delete newGroups[peerAddress];
  return client.sendMessage(
    clientAddress,
    GROUPS_ADDRESS,
    JSON.stringify(newGroups)
  );
};

export const sendGroupMessage = async (
  senderAddress: string,
  groupAddress: string,
  client: XmtpApi,
  message: string
) => {
  return client.sendMessage(
    groupAddress,
    groupAddress,
    JSON.stringify({
      senderAddress,
      message,
    })
  );
};
