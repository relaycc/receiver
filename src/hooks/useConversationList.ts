import { useRelay, useMessageStream } from './useRelay';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Client, Message as XmtpMessage } from '@relaycc/xmtp-js';
import { messageApi } from '@xmtp/proto';
import { Channel, Message } from './types';

export const useConversationList = () => {
  const client = useRelay((state) => state.client);
  const queryClient = useQueryClient();

  useMessageStream((message) => {
    if (client === null) {
      return;
    } else {
      queryClient.setQueryData(
        ['conversations list'],
        (messages: Channel | undefined) => {
          return {
            ...messages,
            [[message.senderAddress, message.recipientAddress].sort().join()]:
              message,
          };
        }
      );
    }
  });

  const conversations = useQuery(
    ['conversations list'],
    async () => {
      if (client === null || client === undefined) {
        throw new Error();
      } else {
        const messages = await fetchConversationList(client);
        return messages.reduce((result, message) => {
          return {
            ...result,
            [[message.senderAddress, message.recipientAddress].sort().join()]:
              message,
          };
        }, {} as Channel);
      }
    },
    {
      enabled: client !== null && client !== undefined,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  return conversations;
};

const fetchConversationList = async (client: Client): Promise<Message[]> => {
  const conversations = await client.conversations.list();
  const peerAddresses = conversations.map(
    (conversation) => conversation.peerAddress
  );
  const lists = await Promise.all(
    peerAddresses.map((peerAddress) => {
      return fetchMessages(client, peerAddress, 1);
    })
  );
  return lists.filter((list) => list.length > 0).map((list) => list[0]);
};

const fetchMessages = async (
  client: Client,
  peerAddress: string,
  limit = 1,
  direction = messageApi.SortDirection.SORT_DIRECTION_DESCENDING
) => {
  const notValidatedMessages = await client.listConversationMessages(
    peerAddress,
    { limit, direction }
  );
  const messages: Message[] = [];
  for (const notValidated of notValidatedMessages) {
    if (validateMessage(notValidated)) {
      messages.push(notValidated);
    }
  }
  return messages;
};

const validateMessage = (xmtpMessage: unknown): xmtpMessage is Message => {
  const test = xmtpMessage as XmtpMessage;
  try {
    return (
      test.sent !== undefined &&
      test.recipientAddress !== undefined &&
      test.senderAddress !== undefined
    );
  } catch {
    return false;
  }
};

const pickPeerAddress = (clientAddress: string, message: Message): string => {
  if (clientAddress === message.recipientAddress) {
    return message.senderAddress;
  } else {
    return message.recipientAddress;
  }
};
