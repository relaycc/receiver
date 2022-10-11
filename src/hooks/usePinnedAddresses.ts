import { isEthAddress } from './types';
import { useQuery } from '@tanstack/react-query';
import { fetchMostRecentMessage, parseJson } from '../utils';
import { Client } from '@relaycc/xmtp-js';

export const usePinnedAddresses = (client?: Client | null) => {
  return useQuery(
    ['pinned addresses'],
    async () => {
      if (client === null || client === undefined) {
        throw new Error('Fetcher executing before XMTP client ready');
      } else {
        const { message, status } = await fetchMostRecentMessage(
          PINNED_ADDRESS,
          client
        );
        if (status !== 'success') {
          throw new Error();
        } else {
          const { data: addresses, status } = parseJson(
            message.content,
            validatePinnedAddresses
          );
          if (status !== 'success') {
            throw new Error();
          } else {
            return addresses;
          }
        }
      }
    },
    { enabled: client !== null && client !== undefined }
  );
};

export const PINNED_ADDRESS = '0xc8f907C6387e0989E75E06EDd2bfc3516806E358';

const validatePinnedAddresses = (data: unknown): data is string[] => {
  try {
    for (const item of data as string[]) {
      if (!isEthAddress(item)) {
        throw new Error();
      }
    }
  } catch {
    return false;
  }
  return true;
};
