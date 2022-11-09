import { useQueries, useQuery } from '@tanstack/react-query';
import {
  MOST_RECENT_MESSAGE_OPTIONS,
  MOST_RECENT_PAGE_OPTIONS,
  fetchPinnedAddresses,
  fetchIgnoredAddresses,
  fetchGroups,
  EthAddress,
  fetchMessages,
} from '../../domain';
import { receiverContext } from '../receiverContext';
import { useConfig } from '../receiver';
import { useWalletAddress } from '../wallet';

export const useClient = (clientAddress?: EthAddress | null) => {
  const config = useConfig();

  return useQuery(
    ['xmtp client', clientAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        config === null
      ) {
        throw new Error(
          'useClient queryFn, clientAddress is null or undefined or config is null'
        );
      } else {
        return config.xmtp.client.fetchClient(clientAddress);
      }
    },
    {
      enabled:
        clientAddress !== null &&
        clientAddress !== undefined &&
        config !== null,
      context: receiverContext,
      refetchOnReconnect: true,
      retry: false,
    }
  );
};

export const usePinnedAddresses = (clientAddress?: EthAddress | null) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQuery(
    ['pinned addresses', clientAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        client.data === undefined ||
        client.data === null ||
        config === null
      ) {
        throw new Error(
          'usePinnedAddress queryFn, clientAddress is null or undefined or config is null or client.data is undefined or null'
        );
      } else {
        return fetchPinnedAddresses(clientAddress, config.xmtp.client);
      }
    },
    {
      context: receiverContext,
      enabled:
        clientAddress !== null &&
        clientAddress !== undefined &&
        client.data !== undefined &&
        client.data !== null &&
        config !== null,
    }
  );
};

export const useIgnoredAddresses = (clientAddress?: EthAddress | null) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQuery(
    ['ignored addresses', clientAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        client.data === undefined ||
        client.data === null ||
        config === null
      ) {
        throw new Error('Running ignored addresses list too early');
      } else {
        return fetchIgnoredAddresses(clientAddress, config.xmtp.client);
      }
    },
    {
      context: receiverContext,
      enabled:
        clientAddress !== null &&
        clientAddress !== undefined &&
        client.data !== undefined &&
        client.data !== null &&
        config !== null,
    }
  );
};

export const useConversations = (clientAddress?: EthAddress | null) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQuery(
    ['conversations list', clientAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        client.data === null ||
        client.data === undefined
      ) {
        throw new Error('Running conversations list too early');
      } else {
        if (config === null) {
          throw new Error('useConversation :: useConfig returned null');
        } else {
          return config.xmtp.client.fetchConversations(clientAddress);
        }
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      context: receiverContext,
      enabled: client.data !== undefined && client.data !== null,
    }
  );
};

export const useConversationsPreviews = (
  addresses: EthAddress[],
  clientAddress?: EthAddress | null
) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQueries({
    queries: addresses.map((peerAddress) => {
      return {
        queryKey: ['messages', clientAddress, peerAddress],
        queryFn: async () => {
          if (
            clientAddress === null ||
            clientAddress === undefined ||
            client.data === undefined ||
            client.data === null
          ) {
            throw new Error('Running messages fetch too early');
          } else {
            if (config === null) {
              throw new Error('useConversation :: useConfig returned null');
            } else {
              const messages = await fetchMessages(
                clientAddress,
                peerAddress,
                config.xmtp.client,
                MOST_RECENT_MESSAGE_OPTIONS
              );
              return {
                peerAddress,
                messages,
              };
            }
          }
        },
        enabled: client.data !== undefined && client.data !== null,
        staleTime: 1000 * 60 * 5,
      };
    }),
    context: receiverContext,
  });
};

export const useMessages = ({
  clientAddress,
  peerAddress,
}: {
  clientAddress?: EthAddress | null;
  peerAddress?: EthAddress | null;
}) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQuery(
    ['messages', clientAddress, peerAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        client.data === null ||
        client.data === undefined ||
        typeof peerAddress !== 'string'
      ) {
        throw new Error('Running messages fetch too early');
      } else {
        if (config === null) {
          throw new Error('useConversation :: useConfig returned null');
        } else {
          const messages = await fetchMessages(
            clientAddress,
            peerAddress,
            config.xmtp.client,
            MOST_RECENT_PAGE_OPTIONS
          );
          return {
            peerAddress,
            messages,
          };
        }
      }
    },
    {
      keepPreviousData: true,
      context: receiverContext,
      enabled:
        clientAddress !== null &&
        clientAddress !== undefined &&
        client.data !== undefined &&
        client.data !== null &&
        config !== null &&
        typeof peerAddress === 'string',
    }
  );
};

export const usePeerOnNetwork = ({
  clientAddress,
  peerAddress,
}: {
  peerAddress?: EthAddress | null;
  clientAddress?: EthAddress | null;
}) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQuery(
    ['peer on network', clientAddress, peerAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        client.data === null ||
        client.data === undefined ||
        typeof peerAddress !== 'string'
      ) {
        throw new Error('Running fetch peer on network too early');
      } else {
        if (config === null) {
          throw new Error('useConversation :: useConfig returned null');
        } else {
          return config.xmtp.client.fetchPeerOnNetwork(
            clientAddress,
            peerAddress
          );
        }
      }
    },
    {
      context: receiverContext,
      enabled:
        clientAddress !== null &&
        clientAddress !== undefined &&
        client.data !== undefined &&
        client.data !== null &&
        config !== null &&
        typeof peerAddress === 'string',
    }
  );
};

export const useGroups = (clientAddress?: EthAddress | null) => {
  const config = useConfig();
  const client = useClient(clientAddress);

  return useQuery(
    ['groups', clientAddress],
    async () => {
      if (
        clientAddress === null ||
        clientAddress === undefined ||
        client.data === undefined ||
        client.data === null ||
        config === null
      ) {
        throw new Error('Running fetchGroups too early');
      } else {
        return fetchGroups(clientAddress, config.xmtp.client);
      }
    },
    {
      context: receiverContext,
      enabled:
        client.data !== undefined &&
        client.data !== null &&
        clientAddress !== null &&
        clientAddress !== undefined &&
        config !== null,
    }
  );
};

export const useGroupsPreviews = (clientAddress?: EthAddress | null) => {
  const walletAddress = useWalletAddress();
  const config = useConfig();
  const groups = useGroups(clientAddress);
  const groupsList = Object.values(groups.data || {});

  const groupClients = useQueries({
    queries: groupsList.map((group) => {
      return {
        queryKey: ['xmtp client', group.wallet.wallet.address],
        queryFn: async () => {
          if (
            clientAddress === null ||
            clientAddress === undefined ||
            config === null
          ) {
            throw new Error('useGroupsPreviews :: queryFn running too early');
          } else {
            await config.xmtp.client.startClient(group.wallet, {
              env: 'production',
            });
            return config.xmtp.client.fetchClient(group.wallet.wallet.address);
          }
        },
      };
    }),
    context: receiverContext,
  });

  const groupClientsIsLoading = groupClients.some(
    (query) => query.data === undefined
  );

  return useQueries({
    queries: groupsList.map((group) => {
      return {
        queryKey: ['messages', walletAddress, group.wallet.wallet.address],
        queryFn: async () => {
          if (config === null) {
            throw new Error(
              'useGroupsPrevies :: fetchGroupsMessages queryFn running too early'
            );
          } else {
            const messages = await fetchMessages(
              group.wallet.wallet.address,
              group.wallet.wallet.address,
              config.xmtp.client,
              MOST_RECENT_MESSAGE_OPTIONS
            );
            return {
              group,
              messages,
            };
          }
        },
        enabled: groups.data !== undefined && !groupClientsIsLoading,
        staleTime: 1000 * 60 * 5,
      };
    }),
    context: receiverContext,
  });
};
