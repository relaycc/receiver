import { useEffect, useState } from 'react';
import { getAddress } from 'ethers/lib/utils';
import { Address, isEnsName } from './types';
import { useProvider } from './useProvider';

const cache: Record<string, Address | undefined> = {};

export const useEnsAddress = ({
  handle,
}: {
  handle?: string | null;
}): Address => {
  const [state, setState] = useState<Address>({
    address: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const provider = useProvider();
    const fetchAddress = async (handle: string) => {
      setState({ status: 'fetching', address: undefined });
      const address = await provider.resolveName(handle);
      const result: Address =
        address === null
          ? { status: 'settled', address: undefined }
          : { status: 'settled', address: getAddress(address) };
      cache[handle] = result;
      setState(result);
    };

    if (!isEnsName(handle)) {
      setState({ address: undefined, status: 'noop' });
    } else {
      const cached = cache[handle];
      if (cached) {
        setState(cached);
      } else {
        fetchAddress(handle);
      }
    }
  }, [handle]);

  return state;
};
