import { useState, useEffect } from 'react';
import { useProvider } from './useProvider';
import { EnsName } from './types';
import { setName, getName } from '../utils';

export const useEnsName = ({ handle }: { handle?: string | null }): EnsName => {
  const provider = useProvider();
  const [state, setState] = useState<EnsName>({
    name: undefined,
    status: 'noop',
  });

  useEffect(() => {
    if (typeof handle === 'string') {
      const listener = () => {
        if (typeof handle === 'string') {
          const cached = getName(handle);
          if (cached) {
            setState(cached);
          }
        }
      };
      document.addEventListener(handle + 'ens cache update', listener);
      return () => {
        document.removeEventListener(handle + 'ens cache update', listener);
      };
    }
  }, [handle]);

  useEffect(() => {
    const fetchName = async (handle: string) => {
      setName(handle, { status: 'fetching', name: undefined });
      setState({ status: 'fetching', name: undefined });
      const name = await provider.lookupAddress(handle);
      const result: EnsName =
        name === null
          ? { status: 'settled', name: undefined }
          : { status: 'settled', name };
      setName(handle, result);
      setState(result);
    };

    if (typeof handle === 'string') {
      const cached = getName(handle);
      if (cached) {
        setState(cached);
      } else {
        fetchName(handle);
      }
    }
  }, [handle]);

  return state;
};
