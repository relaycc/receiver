import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../xmtp';
import { fetchProfileByHandle, fetchProfilesByAddress } from './primitives';
import { isLensName } from './helpers';
import { isEthAddress } from '../types';

export const useLensProfile = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['lens profile', handle],
    async () => {
      if (!isLensName(handle)) {
        return null;
      } else {
        return fetchProfileByHandle(handle);
      }
    },
    {
      context: receiverContext,
    }
  );
};

export const useLensProfiles = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['lens profiles', handle],
    async () => {
      if (!isEthAddress(handle)) {
        throw new Error(
          'Trying to fetch lens profile with invalid ETH address'
        );
      } else {
        return fetchProfilesByAddress(handle);
      }
    },
    {
      context: receiverContext,
    }
  );
};
