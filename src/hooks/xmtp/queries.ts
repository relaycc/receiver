import { useCallback } from 'react';
import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  MOST_RECENT_MESSAGE_OPTIONS,
  MOST_RECENT_PAGE_OPTIONS,
} from './helpers';
import { useXmtp } from './store';
import { receiverContext } from './context';
import { useConfig } from '../receiver';
import { Client } from '../types';

export const useClient = (): [
  () => unknown,
  UseQueryResult<Client, unknown>
] => {
  const { wallet, address } = useXmtp();
  const config = useConfig();

  const query = useQuery(
    ['xmtp client', address],
    async (): Promise<Client> => {
      if (wallet === null || wallet === undefined || address === null) {
        throw new Error('Init running too early');
      } else {
        const created = await config.xmtp.client.startClient(wallet);
        if (!created) {
          throw new Error('failed to initialied client');
        } else {
          return { address, initialized: true };
        }
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
        return [];
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
  const config = useConfig();

  return useQuery(
    ['conversations list', address],
    async () => {
      if (clientQuery.data === null || clientQuery.data === undefined) {
        throw new Error('Running conversations list too early');
      } else {
        return config.xmtp.client.fetchConversations();
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
  const config = useConfig();

  return useQueries({
    queries: addresses.map((peerAddress) => {
      return {
        queryKey: ['messages', address, peerAddress],
        queryFn: async () => {
          if (clientQuery.data === null || clientQuery.data === undefined) {
            throw new Error('Running messages fetch too early');
          } else {
            const messages = await config.xmtp.client.fetchMessages(
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
  const config = useConfig();

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
        const messages = await config.xmtp.client.fetchMessages(
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
  const config = useConfig();

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
        return config.xmtp.client.fetchPeerOnNetwork(peerAddress);
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
