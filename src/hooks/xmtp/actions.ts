import {
  XmtpClient,
  Group,
  Groups,
  fetchPinnedAddresses,
  fetchIgnoredAddresses,
  fetchGroups,
  EthAddress,
  sendPinnedAddresses,
  removePinnedAddress,
  addPinnedAddress,
  sendIgnoredAddresses,
  addIgnoredAddress,
  removeIgnoredAddress,
  addGroup,
  sendGroups,
  removeGroup,
  isGroups,
} from '../../domain';

export const pinAddress = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  peerAddress: EthAddress
) => {
  const pinnedAddresses = await fetchPinnedAddresses(clientAddress, client);
  const newPinnedAddresses = addPinnedAddress(pinnedAddresses, peerAddress);
  if (newPinnedAddresses === null) {
    return null;
  } else {
    return sendPinnedAddresses(clientAddress, client, newPinnedAddresses);
  }
};

export const unpinAddress = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  peerAddress: EthAddress
) => {
  const pinnedAddresses = await fetchPinnedAddresses(clientAddress, client);
  const newPinnedAddresses = removePinnedAddress(pinnedAddresses, peerAddress);
  if (newPinnedAddresses === null) {
    return null;
  } else {
    return sendPinnedAddresses(clientAddress, client, newPinnedAddresses);
  }
};

export const ignoreAddress = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  peerAddress: EthAddress
) => {
  const ignoredAddresses = await fetchIgnoredAddresses(clientAddress, client);
  const newIgnoredAddresses = addIgnoredAddress(ignoredAddresses, peerAddress);
  if (newIgnoredAddresses === null) {
    return null;
  } else {
    return sendIgnoredAddresses(clientAddress, client, newIgnoredAddresses);
  }
};

export const unignoreAddress = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  peerAddress: EthAddress
) => {
  const ignoredAddresses = await fetchIgnoredAddresses(clientAddress, client);
  const newIgnoredAddresses = removeIgnoredAddress(
    ignoredAddresses,
    peerAddress
  );
  if (newIgnoredAddresses === null) {
    return null;
  } else {
    return sendIgnoredAddresses(clientAddress, client, newIgnoredAddresses);
  }
};

export const createGroup = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  options: { name: string; description?: string }
): Promise<{ created: Group; groups: Groups }> => {
  const identity = await client.createIdentity();
  const group: Group = { ...options, wallet: identity };
  const groups = await joinGroup(clientAddress, client, group);
  if (groups === null) {
    throw new Error(
      'createGroup::joinGroup returned null, but should not have, because we just created the new group'
    );
  } else {
    if (!isGroups(groups.content)) {
      throw new Error(
        "createGroup :: groups.content isn't type Groups, but it should be because it's basically the result of joinGroup"
      );
    } else {
      return {
        created: group,
        groups: groups.content,
      };
    }
  }
};

export const joinGroup = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  group: Group
) => {
  const groups = await fetchGroups(clientAddress, client);
  const newGroups = addGroup(groups, group);
  if (newGroups === null) {
    return null;
  } else {
    return sendGroups(clientAddress, client, newGroups);
  }
};

export const leaveGroup = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  group: Group
) => {
  const groups = await fetchGroups(clientAddress, client);
  const newGroups = removeGroup(groups, group);
  if (newGroups === null) {
    return null;
  } else {
    return sendGroups(clientAddress, client, newGroups);
  }
};
