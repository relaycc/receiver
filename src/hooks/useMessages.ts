import { Client, Message as XmtpMessage } from '@relaycc/xmtp-js';
import { Channel, isEthAddress, Message } from './types';
import { messageApi } from '@xmtp/proto';
import { useRelay, useMessageStream } from './useRelay';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useMessages = (handle?: string | null) => {
  const client = useRelay((state) => state.client);
  const queryClient = useQueryClient();

  const queryUpdater = useCallback(
    (message: Message) => {
      queryClient.setQueryData(
        ['messages', handle],
        (messages: Channel | undefined) => {
          return { ...messages, [message.id]: message };
        }
      );
    },
    [handle]
  );

  useMessageStream(queryUpdater);

  return useQuery(
    ['messages', handle],
    async () => {
      if (client === null || client === undefined || !isEthAddress(handle)) {
        throw new Error('Attempted to fetch messages too early!');
      } else {
        const peerOnNetwork = await client.canMessage(handle);
        if (!peerOnNetwork) {
          throw new Error('Peer not on XMTP network');
        } else {
          return fetchMessages(client, handle);
        }
      }
    },
    {
      enabled: client !== null && client !== undefined && isEthAddress(handle),
    }
  );
};

const fetchMessages = async (client: Client, peerAddress: string) => {
  const notValidatedMessages = await client.listConversationMessages(
    peerAddress,
    { limit: 10, direction: messageApi.SortDirection.SORT_DIRECTION_DESCENDING }
  );
  const messages: Message[] = [];
  for (const notValidated of notValidatedMessages) {
    if (validateMessage(notValidated)) {
      messages.push(notValidated);
    }
  }
  return messages.reduce((result, message) => {
    return { ...result, [message.id]: message };
  }, {} as Channel);
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
