import { useState, useEffect } from 'react';
import { useProvider } from './useProvider';
import { EnsName, isEthAddress } from './types';

const cache: Record<string, EnsName | undefined> = {};

export const useEnsName = ({ handle }: { handle?: string | null }): EnsName => {
  const provider = useProvider();
  const [state, setState] = useState<EnsName>({
    name: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchName = async (handle: string) => {
      setState({ status: 'fetching', name: undefined });
      const name = await provider.lookupAddress(handle);
      const result: EnsName =
        name === null
          ? { status: 'settled', name: undefined }
          : { status: 'settled', name };
      cache[handle] = result;
      setState(result);
    };

    if (!isEthAddress(handle)) {
      setState({ name: undefined, status: 'noop' });
    } else {
      const cached = cache[handle];
      if (cached) {
        setState(cached);
      } else {
        fetchName(handle);
      }
    }
  }, [handle]);

  return state;
};
