import { useMemo } from 'react';
export const useResponsiveName = (
  ensName: string | null | undefined,
  address: string | null | undefined,
  fallback: string
) => {
  const userDisplayId: string | null | undefined = useMemo(() => {
    return ensName || address;
  }, [ensName, address]);

  const responsiveDisplayId = useMemo(() => {
    if (!userDisplayId) {
      return fallback;
    }
    if (ensName) {
      return truncateName(ensName);
    }
    if (address) {
      return truncateAddress(address);
    } else return fallback;
  }, [userDisplayId]);

  return responsiveDisplayId;
};

function truncateName(e: string | undefined) {
  if (e === undefined) {
    return 'ENS name or address not found';
  }
  if (e.length > 25) {
    return e.slice(0, 17) + '...' + e.substring(e.length - 4);
  } else return e;
}

function truncateAddress(e: string | undefined) {
  if (e === undefined) {
    return 'Name or address not found';
  }
  return e.slice(0, 5) + '...' + e.substring(e.length - 5);
}
