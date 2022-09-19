import { useState, useEffect } from 'react';
import { useProvider } from './useProvider';
import { TransactionCount } from './types';

export const useTransactionCount = ({
  handle,
}: {
  handle?: string | null;
}): TransactionCount => {
  const provider = useProvider();
  const [state, setState] = useState<TransactionCount>({
    count: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchBalance = async (handle: string) => {
      setState({ status: 'fetching', count: undefined });
      const count = await provider.getTransactionCount(handle);
      setState({ status: 'settled', count });
    };

    if (typeof handle === 'string') {
      fetchBalance(handle);
    }
  }, [handle]);

  return state;
};
