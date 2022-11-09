import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../xmtp';
import {
  fetchProfileByHandle,
  fetchProfilesByAddress,
  avatarFromProfile,
  getFirstProfile,
  lensNameFromProfile,
  isLensProfile,
  addressFromProfile,
  isLensName,
  isEthAddress,
} from '../../domain';

export const useLensProfile = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
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
      enabled: wait !== true,
    }
  );
};

export const useLensProfiles = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ['lens profiles', handle],
    async () => {
      if (!isEthAddress(handle)) {
        return null;
      } else {
        return fetchProfilesByAddress(handle);
      }
    },
    {
      context: receiverContext,
      enabled: wait !== true,
    }
  );
};

export const useLensName = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  const profilesByAddress = useLensProfiles({ handle, wait });
  const name = useMemo(() => {
    if (
      profilesByAddress.data === null ||
      profilesByAddress.data === undefined
    ) {
      return profilesByAddress.data;
    } else {
      const profile = getFirstProfile(profilesByAddress.data);
      if (!isLensProfile(profile)) {
        return null;
      } else {
        return lensNameFromProfile(profile);
      }
    }
  }, [profilesByAddress.data]);
  return {
    ...profilesByAddress,
    data: name,
  };
};

export const useLensAddress = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  const profileByName = useLensProfile({ handle, wait });
  const address = useMemo(() => {
    if (profileByName.data === null || profileByName.data === undefined) {
      return profileByName.data;
    } else {
      return addressFromProfile(profileByName.data);
    }
  }, [profileByName.data]);
  return {
    ...profileByName,
    data: address,
  };
};

export const useLensAvatar = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  const profile = useLensProfile({ handle, wait });
  return {
    ...profile,
    data: (() => {
      if (profile.data === null || profile.data === undefined) {
        return profile.data;
      } else {
        return avatarFromProfile(profile.data);
      }
    })(),
  };
};
