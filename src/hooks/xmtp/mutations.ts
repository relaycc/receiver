import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfig } from '../receiver';
import {
  pinAddress,
  unpinAddress,
  ignoreAddress,
  unignoreAddress,
  createGroup,
  leaveGroup,
  sendGroupMessage,
} from './helpers';
import { useXmtp } from './store';
import { receiverContext } from './context';
import { WorkerWallet } from '../types';

export const useStartClient = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });

  return useMutation(
    async ({ wallet }: { wallet: WorkerWallet }) => {
      if (config === null) {
        throw new Error('useStartClient mutation, config is null');
      } else {
        return config.xmtp.client.startClient(wallet, { env: 'production' });
      }
    },
    {
      context: receiverContext,
      onSuccess: (client) => {
        queryClient.invalidateQueries(['xmtp client', client?.address]);
      },
    }
  );
};

export const usePinAddress = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const { address } = useXmtp();

  const pin = useMutation(
    async ({ peerAddress }: { peerAddress: string }) => {
      if (config === null || address === null) {
        throw new Error(
          'usePinAddress::pin mutation, config is null or address is null'
        );
      } else {
        return pinAddress(address, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['pinned addresses', address]);
      },
    }
  );

  const unpin = useMutation(
    async ({ peerAddress }: { peerAddress: string }) => {
      if (config === null || address === null) {
        throw new Error(
          'usePinAddress::unpin mutation, config is null or address is null'
        );
      } else {
        return unpinAddress(address, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['pinned addresses', address]);
      },
    }
  );

  return { pin, unpin };
};

export const useIgnoreAddress = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const { address } = useXmtp();

  const ignore = useMutation(
    async ({ peerAddress }: { peerAddress: string }) => {
      if (config === null || address === null) {
        throw new Error('useIgnoreAddress::unpin mutation, config is null');
      } else {
        return ignoreAddress(address, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['ignored addresses', address]);
      },
    }
  );

  const unignore = useMutation(
    async ({ peerAddress }: { peerAddress: string }) => {
      if (config === null || address === null) {
        throw new Error(
          'useIgnoreAddress:unignore mutation, config is null or address is null'
        );
      } else {
        if (peerAddress === undefined || peerAddress === null) {
          return;
        } else {
          return unignoreAddress(address, config.xmtp.client, peerAddress);
        }
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['ignored addresses', address]);
      },
    }
  );

  return { ignore, unignore };
};

export const useGroup = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const { address } = useXmtp();

  const create = useMutation(
    async ({ name }: { name: string }) => {
      if (config === null || address === null) {
        throw new Error(
          'useGroup::create mutation, config is null or address is null'
        );
      } else {
        const { created } = await createGroup(address, config.xmtp.client, {
          name,
        });
        await sendGroupMessage(
          created.wallet.wallet.address,
          created.wallet.wallet.address,
          config.xmtp.client,
          `New Group Created by ${address} at ${new Date().toLocaleString()}`
        );
        return created;
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['groups', address]);
      },
    }
  );

  const leave = useMutation(
    async ({ peerAddress }: { peerAddress: string }) => {
      if (config === null || address === null) {
        throw new Error(
          'useGroup::leave mutation, config is null or address is null'
        );
      } else {
        return leaveGroup(address, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['groups', address]);
      },
    }
  );

  return { create, leave };
};
