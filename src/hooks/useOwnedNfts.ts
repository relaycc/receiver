import { useEffect, useState } from 'react';
import { OwnedNfts, OwnedNFTsResponse } from './types';

// TODO(achilles@relay.cc) In the future the contractAddresses param can be
// opened up to allow arrays.
// TODO(achilles@relay.cc) Figure out what types this should be.
const fetchNFTs = async (owner: string, contractAddresses: string) => {
  const alchemyKey = 'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx';
  const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyKey}/getNFTs`;
  const response = await fetch(
    url +
      '?' +
      new URLSearchParams({
        owner,
        withMetadata: 'true',
        'contractAddresses[]': contractAddresses,
      })
  );
  const body = await response.json();
  return body;
};

export const useOwnedNfts = ({
  handle,
  contractAddress,
}: {
  handle?: string | null;
  contractAddress: string;
}) => {
  const [state, setState] = useState<OwnedNfts>({
    ownedNfts: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchNftsEffect = async (handle: string, contractAddress: string) => {
      setState({ status: 'fetching', ownedNfts: undefined });
      const ownedNfts = await fetchNFTs(handle, contractAddress);
      const result: OwnedNfts =
        ownedNfts === null
          ? { status: 'settled', ownedNfts: undefined }
          : { status: 'settled', ownedNfts };
      setState(result);
    };

    if (typeof handle === 'string') {
      fetchNftsEffect(handle, contractAddress);
    }
  }, [handle]);

  return state;
};

export const onlyWithImages = (nfts: OwnedNFTsResponse): OwnedNFTsResponse => {
  return {
    ownedNfts: nfts.ownedNfts.filter((ownedNft) => {
      return Boolean(getImageUrl(ownedNft));
    }),
  };
};

export const getImageUrl = (nft: {
  media: { gateway: string }[];
}): string | undefined => {
  for (const { gateway } of nft.media) {
    if (gateway.length > 0) return gateway;
  }
  return undefined;
};

export const arrayToRows = <T>(arr: T[], rowLength: number): Array<T>[] => {
  const result = [];
  for (let i = 0; i < arr.length; i += rowLength) {
    result.push(arr.slice(i, i + rowLength));
  }
  return result;
};

export const getNumEnsNames = (ownedNfts: OwnedNFTsResponse): number => {
  return ownedNfts.ownedNfts.filter((data) => {
    return (
      data.contract.address.toLowerCase() ===
      '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'.toLowerCase()
    );
  }).length;
};

export const getLastUpdated = (
  ensName: string,
  ownedNfts: OwnedNFTsResponse
): Date | null => {
  const nft = ownedNfts.ownedNfts.find((nft) => nft.title === ensName);
  if (nft === undefined) {
    return null;
  } else {
    try {
      return new Date(nft.timeLastUpdated);
    } catch {
      return null;
    }
  }
};
