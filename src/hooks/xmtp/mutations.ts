import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfig } from '../receiver';
import {
  pinAddress,
  unpinAddress,
  ignoreAddress,
  unignoreAddress,
} from './helpers';
import { useXmtp } from './store';
import { receiverContext } from './context';

export const usePinAddress = (peerAddress?: string | null) => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const { address } = useXmtp();

  const pin = useMutation(
    async () => {
      if (config === null) {
        throw new Error('Running pinAddress mutation too early');
      } else {
        if (peerAddress === undefined || peerAddress === null) {
          return;
        } else {
          return pinAddress(config.xmtp.client, peerAddress);
        }
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
    async () => {
      if (config === null) {
        throw new Error('Running pinAddress mutation too early');
      } else {
        if (peerAddress === undefined || peerAddress === null) {
          return;
        } else {
          return unpinAddress(config.xmtp.client, peerAddress);
        }
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

export const useIgnoreAddress = (peerAddress?: string | null) => {
  const config = useConfig();
  const queryClient = useQueryClient({ context: receiverContext });
  const { address } = useXmtp();

  const ignore = useMutation(
    async () => {
      if (config === null) {
        throw new Error('Running ignoreAddress mutation too early');
      } else {
        if (peerAddress === undefined || peerAddress === null) {
          return;
        } else {
          return ignoreAddress(config.xmtp.client, peerAddress);
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

  const unignore = useMutation(
    async () => {
      if (config === null) {
        throw new Error('Running ignoreAddress mutation too early');
      } else {
        if (peerAddress === undefined || peerAddress === null) {
          return;
        } else {
          return unignoreAddress(config.xmtp.client, peerAddress);
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
