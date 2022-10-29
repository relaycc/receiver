import { useMemo } from 'react';
import { isEthAddress } from '../utils';
import { useEnsAddress, useEnsName, isEnsName } from './ens';
import {
  useLensProfile,
  useLensProfiles,
  isLensName,
  getDefaultProfile,
  getFirstProfile,
  getMostFollowedProfile,
} from './lens';
export const useRelayId = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  // address
  const addressFromEns = useEnsAddress({ handle, wait });
  const addressFromLens = useLensProfile({ handle });

  // ens
  const ensFromAddress = useEnsName({ handle, wait });
  const ensFromLens = useEnsName({
    handle: addressFromLens.data?.ownedBy,
    wait,
  });

  // lens
  const lensFromAddress = useLensProfiles({ handle });
  const lensFromEns = useLensProfiles({ handle: addressFromEns.data });

  const address = useMemo(() => {
    if (isEthAddress(handle)) {
      return {
        isLoading: false,
        isError: false,
        isFetching: false,
        data: handle,
      };
    } else if (isEnsName(handle)) {
      return addressFromEns;
    } else if (isLensName(handle)) {
      return { ...addressFromLens, data: addressFromLens.data?.ownedBy };
    } else {
      return {
        isError: true,
        isLoading: false,
        isFetching: false,
        data: undefined,
      };
    }
  }, [addressFromEns.status, addressFromLens.status]);

  const ens = useMemo(() => {
    if (isEnsName(handle)) {
      return {
        ...addressFromEns,
        data: addressFromEns.data === undefined ? undefined : handle,
      };
    } else if (isEthAddress(handle)) {
      return ensFromAddress;
    } else if (isLensName(handle)) {
      return ensFromLens;
    } else {
      return {
        isError: true,
        isLoading: false,
        isFetching: false,
        data: undefined,
      };
    }
  }, [addressFromEns.status, ensFromAddress.status, ensFromLens.status]);

  const lens = useMemo(() => {
    if (isLensName(handle)) {
      return {
        ...addressFromLens,
        data: addressFromLens.data === undefined ? undefined : handle,
      };
    } else if (isEthAddress(handle)) {
      return {
        ...lensFromAddress,
        data: (() => {
          if (lensFromAddress.data === undefined) {
            return undefined;
          } else {
            const profile =
              getDefaultProfile(lensFromAddress.data) ||
              getMostFollowedProfile(lensFromAddress.data) ||
              getFirstProfile(lensFromAddress.data);
            return profile?.handle;
          }
        })(),
      };
    } else if (isEnsName(handle)) {
      return {
        ...lensFromEns,
        data: (() => {
          if (lensFromAddress.data === undefined) {
            return undefined;
          } else {
            const profile =
              getDefaultProfile(lensFromAddress.data) ||
              getMostFollowedProfile(lensFromAddress.data) ||
              getFirstProfile(lensFromAddress.data);
            return profile?.ownedBy;
          }
        })(),
      };
    } else {
      return {
        isError: true,
        isLoading: false,
        isFetching: false,
        data: undefined,
      };
    }
  }, [addressFromLens.status, lensFromAddress.status, lensFromEns.status]);

  return {
    address,
    ens,
    lens,
  };
};
