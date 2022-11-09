import {
  GroupMessage,
  IGNORED_ADDRESS,
  GROUPS_ADDRESS,
  PINNED_ADDRESS,
  PinnedAddresses,
  IgnoredAddresses,
  Groups,
  GroupInvite,
} from '../codecs';
import {
  PINNED_ADDRESSES_ID,
  IGNORED_ADDRESSES_ID,
  GROUPS_ID,
  GROUP_INVITE_ID,
  GROUP_MESSAGE_ID,
} from '../mapping/ContentTypeId';
import { EthAddress } from '../../eth';
import { XmtpClient } from '../XmtpClient';

export const sendText = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  peerAddress: EthAddress,
  message: string
) => {
  return client.sendMessage(clientAddress, peerAddress, message);
};

export const sendGroupMessage = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  message: GroupMessage
) => {
  return client.sendMessage(clientAddress, clientAddress, message, {
    contentType: GROUP_MESSAGE_ID,
  });
};

export const sendPinnedAddresses = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  message: PinnedAddresses
) => {
  return client.sendMessage(clientAddress, PINNED_ADDRESS, message, {
    contentType: PINNED_ADDRESSES_ID,
  });
};

export const sendIgnoredAddresses = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  message: IgnoredAddresses
) => {
  return client.sendMessage(clientAddress, IGNORED_ADDRESS, message, {
    contentType: IGNORED_ADDRESSES_ID,
  });
};

export const sendGroups = async (
  clientAddress: EthAddress,
  client: XmtpClient,
  message: Groups
) => {
  return client.sendMessage(clientAddress, GROUPS_ADDRESS, message, {
    contentType: GROUPS_ID,
  });
};

export const sendGroupInvite = async (
  clientAddress: EthAddress,
  peerAddress: EthAddress,
  client: XmtpClient,
  message: GroupInvite
) => {
  return client.sendMessage(clientAddress, peerAddress, message, {
    contentType: GROUP_INVITE_ID,
  });
};
