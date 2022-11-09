import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfig } from '../receiver';
import {
  pinAddress,
  unpinAddress,
  ignoreAddress,
  unignoreAddress,
  createGroup,
  leaveGroup,
  joinGroup,
} from './actions';
import { receiverContext } from '../receiverContext';
import {
  EthAddress,
  Group,
  Wallet,
  sendGroupMessage,
  sendGroupInvite,
  sendText,
} from '../../domain';
import { useWalletAddress } from '../wallet';

export const useSendText = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const walletAddress = useWalletAddress();

  return useMutation(
    async ({
      peerAddress,
      content,
    }: {
      peerAddress?: EthAddress | null;
      content: string;
    }) => {
      if (
        config === null ||
        walletAddress === null ||
        peerAddress === null ||
        peerAddress === undefined
      ) {
        return null;
      } else {
        return sendText(
          walletAddress,
          config.xmtp.client,
          peerAddress,
          content
        );
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['messages', walletAddress]);
      },
    }
  );
};

export const useStartClient = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });

  return useMutation(
    async ({ wallet }: { wallet: Wallet }) => {
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
  const walletAddress = useWalletAddress();

  const pin = useMutation(
    async ({ peerAddress }: { peerAddress: EthAddress }) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'usePinAddress::pin mutation, config is null or address is null'
        );
      } else {
        return pinAddress(walletAddress, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['pinned addresses', walletAddress]);
      },
    }
  );

  const unpin = useMutation(
    async ({ peerAddress }: { peerAddress: EthAddress }) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'usePinAddress::unpin mutation, config is null or address is null'
        );
      } else {
        return unpinAddress(walletAddress, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['pinned addresses', walletAddress]);
      },
    }
  );

  return { pin, unpin };
};

export const useIgnoreAddress = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const walletAddress = useWalletAddress();

  const ignore = useMutation(
    async ({ peerAddress }: { peerAddress: EthAddress }) => {
      if (config === null || walletAddress === null) {
        throw new Error('useIgnoreAddress::unpin mutation, config is null');
      } else {
        return ignoreAddress(walletAddress, config.xmtp.client, peerAddress);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['ignored addresses', walletAddress]);
      },
    }
  );

  const unignore = useMutation(
    async ({ peerAddress }: { peerAddress: EthAddress }) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'useIgnoreAddress:unignore mutation, config is null or address is null'
        );
      } else {
        if (
          peerAddress === undefined ||
          peerAddress === null ||
          walletAddress === null
        ) {
          return;
        } else {
          return unignoreAddress(
            walletAddress,
            config.xmtp.client,
            peerAddress
          );
        }
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['ignored addresses', walletAddress]);
      },
    }
  );

  return { ignore, unignore };
};

export const useGroup = () => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const walletAddress = useWalletAddress();

  const create = useMutation(
    async ({ name }: { name: string }) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'useGroup::create mutation, config is null or address is null'
        );
      } else {
        const { created } = await createGroup(
          walletAddress,
          config.xmtp.client,
          {
            name,
          }
        );
        await sendGroupMessage(
          created.wallet.wallet.address,
          config.xmtp.client,
          {
            senderAddress: walletAddress,
            message: `New Group Created by ${walletAddress} at ${new Date().toLocaleString()}`,
          }
        );
        return created;
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['groups', walletAddress]);
      },
    }
  );

  const join = useMutation(
    async (group: Group) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'useGroup::join mutation, config is null or address is null'
        );
      } else {
        return joinGroup(walletAddress, config.xmtp.client, group);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['groups', walletAddress]);
      },
    }
  );

  const invite = useMutation(
    async ({
      peerAddress,
      group,
    }: {
      peerAddress: EthAddress;
      group: Group;
    }) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'useGroup::invite mutation, config is null or address is null'
        );
      } else {
        return sendGroupInvite(walletAddress, peerAddress, config.xmtp.client, {
          inviterAddress: walletAddress,
          group,
        });
      }
    },
    {
      context: receiverContext,
    }
  );

  const leave = useMutation(
    async (group: Group) => {
      if (config === null || walletAddress === null) {
        throw new Error(
          'useGroup::leave mutation, config is null or address is null'
        );
      } else {
        return leaveGroup(walletAddress, config.xmtp.client, group);
      }
    },
    {
      context: receiverContext,
      onSuccess: () => {
        queryClient.invalidateQueries(['groups', walletAddress]);
      },
    }
  );

  return { create, leave, join, invite };
};
