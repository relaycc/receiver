import {
  EthAddress,
  fetchEthBalance,
  fetchTransactionCount,
  isEthAddress,
} from '../../domain';
import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../receiverContext';

export const useEthBalance = ({ handle }: { handle?: EthAddress | null }) => {
  return useQuery(
    ['eth balance', handle],
    async () => {
      if (!isEthAddress(handle)) {
        return null;
      } else {
        return fetchEthBalance(handle);
      }
    },
    {
      context: receiverContext,
    }
  );
};

export const useTransactionCount = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['transaction count', handle],
    async () => {
      if (!isEthAddress(handle)) {
        return null;
      } else {
        return fetchTransactionCount(handle);
      }
    },
    {
      context: receiverContext,
    }
  );
};
