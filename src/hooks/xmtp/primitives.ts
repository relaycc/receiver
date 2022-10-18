import { Client, ClientOptions, ListMessagesOptions } from '@relaycc/xmtp-js';
import { Signer } from 'ethers';

export const fetchClient = (signer: Signer, opts: Partial<ClientOptions>) => {
  return Client.create(signer, opts);
};

export const fetchMessages = async (
  client: Client,
  peerAddress: string,
  opts: ListMessagesOptions
) => {
  return client.listConversationMessages(peerAddress, opts);
};

export const fetchConversations = async (client: Client) => {
  return client.conversations.list();
};

export const fetchPeerOnNetwork = (client: Client, peerAddress: string) => {
  return client.canMessage(peerAddress);
};

export const fetchAllMessagesStream = async (client: Client) => {
  return client.conversations.streamAllMessages();
};

export const fetchConversationMessagesStream = async (
  client: Client,
  peerAddress: string
) => {
  return client.streamConversationMessages(peerAddress);
};

export const sendMessage = (
  client: Client,
  peerAddress: string,
  message: string
) => {
  return client.sendMessage(peerAddress, message);
};
