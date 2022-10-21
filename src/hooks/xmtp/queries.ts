import { useCallback } from 'react';
import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchConversations,
  fetchClient,
  fetchMessages,
  fetchPeerOnNetwork,
  fetchAllMessagesStream,
  fetchConversationMessagesStream,
} from './primitives';
import {
  fetchPinnedAddresses,
  MOST_RECENT_MESSAGE_OPTIONS,
  MOST_RECENT_PAGE_OPTIONS,
} from './helpers';
import { useXmtp } from './store';
import { receiverContext } from './context';
import { Client } from '@relaycc/xmtp-js';
import { useConfig } from '../receiver';

export const useClient = (): [
  () => unknown,
  UseQueryResult<Client, unknown>
] => {
  const { wallet, address } = useXmtp();
  const config = useConfig();

  const query = useQuery(
    ['xmtp client', address],
    async () => {
      if (wallet === null || wallet === undefined) {
        throw new Error('Init running too early');
      } else {
        return fetchClient(
          wallet,
          (() => {
            if (config?.xmtp?.network === undefined) {
              return {};
            } else {
              return { env: config.xmtp.network };
            }
          })()
        );
      }
    },
    {
      context: receiverContext,
      enabled: false,
      refetchInterval: 1000 * 60 * 60,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
    }
  );

  const trigger = useCallback(() => {
    query.refetch();
  }, []);

  return [trigger, query];
};

export const usePinnedAddresses = () => {
  const { address } = useXmtp();
  const [, clientQuery] = useClient();

  return useQuery(
    ['pinned addresses', address],
    async () => {
      if (clientQuery.data === null || clientQuery.data === undefined) {
        throw new Error('Running pinned addresses list too early');
      } else {
        return fetchPinnedAddresses(clientQuery.data);
      }
    },
    {
      staleTime: Infinity,
      context: receiverContext,
      enabled: clientQuery.data !== null && clientQuery.data !== undefined,
    }
  );
};

export const useConversations = () => {
  const { address } = useXmtp();
  const [, clientQuery] = useClient();

  return useQuery(
    ['conversations list', address],
    async () => {
      if (clientQuery.data === null || clientQuery.data === undefined) {
        throw new Error('Running conversations list too early');
      } else {
        return fetchConversations(clientQuery.data);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      context: receiverContext,
      enabled: clientQuery.data !== null && clientQuery.data !== undefined,
    }
  );
};

export const useConversationsPreviews = (addresses: string[]) => {
  const { address } = useXmtp();
  const [, clientQuery] = useClient();

  return useQueries({
    queries: addresses.map((peerAddress) => {
      return {
        queryKey: ['messages', address, peerAddress],
        queryFn: async () => {
          if (clientQuery.data === null || clientQuery.data === undefined) {
            throw new Error('Running messages fetch too early');
          } else {
            const messages = await fetchMessages(
              clientQuery.data,
              peerAddress,
              MOST_RECENT_MESSAGE_OPTIONS
            );
            return {
              peerAddress,
              messages,
            };
          }
        },
        enabled: clientQuery.data !== null && clientQuery.data !== undefined,
        staleTime: 1000 * 60 * 5,
      };
    }),
    context: receiverContext,
  });
};

export const useMessages = ({
  peerAddress,
}: {
  peerAddress: string | null | undefined;
}) => {
  const { address } = useXmtp();
  const [, { data: client }] = useClient();

  return useQuery(
    ['messages', address, peerAddress],
    async () => {
      if (
        client === null ||
        client === undefined ||
        typeof peerAddress !== 'string'
      ) {
        throw new Error('Running messages fetch too early');
      } else {
        const messages = await fetchMessages(
          client,
          peerAddress,
          MOST_RECENT_PAGE_OPTIONS
        );
        return {
          peerAddress,
          messages,
        };
      }
    },
    {
      keepPreviousData: true,
      context: receiverContext,
      enabled:
        client !== null &&
        client !== undefined &&
        typeof peerAddress === 'string',
    }
  );
};

export const usePeerOnNetwork = ({
  peerAddress,
}: {
  peerAddress: string | null | undefined;
}) => {
  const { address } = useXmtp();
  const [, { data: client }] = useClient();

  return useQuery(
    ['peer on network', address, peerAddress],
    async () => {
      if (
        client === null ||
        client === undefined ||
        typeof peerAddress !== 'string'
      ) {
        throw new Error('Running fetch peer on network too early');
      } else {
        return fetchPeerOnNetwork(client, peerAddress);
      }
    },
    {
      context: receiverContext,
      enabled:
        client !== null &&
        client !== undefined &&
        typeof peerAddress === 'string',
    }
  );
};

export const useAllMessagesStream = () => {
  const { address } = useXmtp();
  const [, { data: client }] = useClient();

  return useQuery(
    ['all messages stream', address],
    async () => {
      if (client === null || client === undefined) {
        throw new Error('Fetching message stream too early');
      } else {
        return fetchAllMessagesStream(client);
      }
    },
    {
      context: receiverContext,
      enabled: client !== null && client !== undefined,
      refetchInterval: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  );
};

export const useConversationMessagesStream = ({
  peerAddress,
}: {
  peerAddress: string;
}) => {
  const { address } = useXmtp();
  const [, { data: client }] = useClient();

  return useQuery(
    ['conversation messages stream', address, peerAddress],
    async () => {
      if (client === null || client === undefined) {
        throw new Error('Fetching message stream too early');
      } else {
        return fetchConversationMessagesStream(client, peerAddress);
      }
    },
    {
      context: receiverContext,
      enabled: client !== null && client !== undefined,
      refetchInterval: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  );
};
