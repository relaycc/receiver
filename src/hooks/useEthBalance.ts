import { useState, useEffect } from 'react';
import { useProvider } from './useProvider';
import { EthBalance } from './types';

export const useEthBalance = ({
  handle,
}: {
  handle?: string | null;
}): EthBalance => {
  const provider = useProvider();
  const [state, setState] = useState<EthBalance>({
    balance: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchBalance = async (handle: string) => {
      setState({ status: 'fetching', balance: undefined });
      const balance = await provider.getBalance(handle);
      setState({ status: 'settled', balance: balance.toString() });
    };

    if (typeof handle === 'string') {
      fetchBalance(handle);
    }
  }, [handle]);

  return state;
};
