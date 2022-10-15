import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../xmtp';
import {
  fetchEnsAddress,
  fetchEnsAvatar,
  fetchEnsName,
  isEnsName,
} from './primitives';
import { isEthAddress } from '../../utils';

export const useEnsName = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
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
      enabled: wait !== true && isEthAddress(handle),
      context: receiverContext,
    }
  );
};

export const useEnsAddress = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
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
      enabled: wait !== true && isEnsName(handle),
      staleTime: 1000 * 60 * 5,
      context: receiverContext,
    }
  );
};

export const useEnsAvatar = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
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
      enabled: wait !== true && (isEthAddress(handle) || isEnsName(handle)),
      context: receiverContext,
    }
  );
};
