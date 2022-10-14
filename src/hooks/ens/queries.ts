import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../xmtp';
import {
  fetchEnsAddress,
  fetchEnsAvatar,
  fetchEnsName,
  isEnsName,
} from './primitives';
import { isEthAddress } from '../../utils';

export const useEnsName = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['ens name', handle],
    async () => {
      if (!isEthAddress(handle)) {
        throw new Error('Trying to fetch an ENS name for invalid address!');
      } else {
        return fetchEnsName(handle);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: isEthAddress(handle),
      context: receiverContext,
    }
  );
};

export const useEnsAddress = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['ens address', handle],
    async () => {
      if (!isEnsName(handle)) {
        throw new Error('Trying to fetch an ENS address for invalid name!');
      } else {
        return fetchEnsAddress(handle);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      context: receiverContext,
    }
  );
};

export const useEnsAvatar = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['ens avatar', handle],
    async () => {
      if (!isEthAddress(handle) && !isEnsName(handle)) {
        throw new Error('Trying to fetch an ENS avatar for invalid address!');
      } else {
        return fetchEnsAvatar(handle);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: isEthAddress(handle) || isEnsName(handle),
      context: receiverContext,
    }
  );
};
