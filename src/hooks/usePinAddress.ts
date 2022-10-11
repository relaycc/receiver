import { usePinnedAddresses, PINNED_ADDRESS } from './usePinnedAddresses';
import { useRelay } from './useRelay';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const usePinAddress = () => {
  const pinned = usePinnedAddresses();
  const client = useRelay((state) => state.client);
  const queryClient = useQueryClient();
  return useMutation(
    async (peerAddress: string) => {
      if (client === null || client === undefined) {
        return undefined;
      } else {
        if (pinned.status !== 'success') {
          throw new Error();
        } else {
          const addresses = [...pinned.data, peerAddress];
          return client.sendMessage(PINNED_ADDRESS, JSON.stringify(addresses));
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pinned addresses']);
      },
    }
  );
};
