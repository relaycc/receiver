import { isEthAddress, provider } from '../../domain';
import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../receiverContext';
export const useEthBalance = ({ handle }: { handle?: string | null }) => {
  return useQuery(
    ['eth balance', handle],
    async () => {
      if (!isEthAddress(handle)) {
        return null;
      } else {
        return provider.getBalance(handle);
      }
    },
    {
      context: receiverContext,
    }
  );
};
