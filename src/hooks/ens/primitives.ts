import { getAddress } from '@ethersproject/address';
import { AlchemyProvider } from '@ethersproject/providers';
import { isEthAddress } from '@relaycc/xmtp-hooks';

const provider = new AlchemyProvider(
  'homestead',
  'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx'
);

export const isEnsName = (handle?: string | null): handle is string => {
  return typeof handle === 'string' && handle.endsWith('.eth');
};

export const fetchEnsAddress = async (ensName: string) => {
  const resolved = await provider.resolveName(ensName);
  if (resolved === null) {
    return null;
  } else {
    const address = getAddress(resolved);
    if (!isEthAddress(address)) {
      return null;
    } else {
      return address;
    }
  }
};

export const fetchEnsName = async (address: string) => {
  return provider.lookupAddress(address);
};

export const fetchEnsAvatar = async (addressOrName: string) => {
  return provider.getAvatar(addressOrName);
};
