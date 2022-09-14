import { useEffect, useState } from 'react';
import { getAddress as toChecksumAddress } from 'ethers/lib/utils';
import { Address } from './types';
import { useProvider } from './useProvider';
import { getAddress, setAddress } from '../utils';

export const useEnsAddress = ({
  handle,
}: {
  handle?: string | null;
}): Address => {
  const [state, setState] = useState<Address>(
    (handle && getAddress(handle)) || {
      address: undefined,
      status: 'noop',
    }
  );

  useEffect(() => {
    if (typeof handle === 'string') {
      const listener = () => {
        if (typeof handle === 'string') {
          const cached = getAddress(handle);
          if (cached) {
            setState(cached);
          }
        }
      };
      document.addEventListener(handle + 'ens address cache update', listener);
      return () => {
        document.removeEventListener(
          handle + 'ens address cache update',
          listener
        );
      };
    }
  }, [handle]);

  useEffect(() => {
    const provider = useProvider();
    const fetchAddress = async (handle: string) => {
      setAddress(handle, { status: 'fetching', address: undefined });
      setState({ status: 'fetching', address: undefined });
      const address = await provider.resolveName(handle);
      const result: Address =
        address === null
          ? { status: 'settled', address: undefined }
          : { status: 'settled', address: toChecksumAddress(address) };
      setAddress(handle, result);
      setState(result);
    };

    if (typeof handle === 'string') {
      const cached = getAddress(handle);
      if (cached) {
        setState({ ...cached });
      } else {
        fetchAddress(handle);
      }
    }
  }, [handle]);

  return state;
};
