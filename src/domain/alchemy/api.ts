import { AlchemyProvider } from '@ethersproject/providers';
import { getAddress } from '@ethersproject/address';
import { EthAddress, isEthAddress } from '../eth';
import { EnsName, isEnsAvatar, isEnsName } from '../ens';
import { EnsAvatar } from '../ens';
import { isOwnedNFTsResponse, OwnedNFTsResponse } from './OwnedNftsResponse';
export const provider = new AlchemyProvider(
  'homestead',
  'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx'
);
const ALCHEMY_KEY = 'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx';

export const fetchTransactionCount = async (address: EthAddress) => {
  return provider.getTransactionCount(address);
};

export const fetchNfts = async (
  owner: EthAddress,
  contractAddresses: EthAddress
): Promise<OwnedNFTsResponse> => {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_KEY}/getNFTs`;
  const response = await fetch(
    url +
      '?' +
      new URLSearchParams({
        owner,
        withMetadata: 'true',
        'contractAddresses[]': contractAddresses,
      })
  );
  const ownedNftsResponse = await response.json();
  if (!isOwnedNFTsResponse(ownedNftsResponse)) {
    throw new Error(
      'fetchNfts :: invalid response, isOwnedNFTsResponse returned false'
    );
  } else {
    return ownedNftsResponse;
  }
};

export const fetchEthBalance = (address: EthAddress) => {
  return provider.getBalance(address);
};

export const fetchEnsAddress = async (
  ensName: EnsName
): Promise<EthAddress | null> => {
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

export const fetchEnsName = async (
  address: EthAddress
): Promise<EnsName | null> => {
  const resolved = await provider.lookupAddress(address);
  if (!isEnsName(resolved)) {
    return null;
  } else {
    return resolved;
  }
};

export const fetchEnsAvatar = async (
  addressOrName: EnsName | EthAddress
): Promise<EnsAvatar | null> => {
  const avatar = await provider.getAvatar(addressOrName);
  if (!isEnsAvatar(avatar)) {
    return null;
  } else {
    return avatar;
  }
};
