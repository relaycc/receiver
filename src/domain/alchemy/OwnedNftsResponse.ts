export interface OwnedNFTsResponse {
  ownedNfts: {
    contract: {
      address: string;
    };
    id: {
      tokenId: string;
      tokenMetadata: {
        tokenType: string;
      };
    };
    media: {
      gateway: string;
    }[];
    metadata: {
      name: string;
    };
    title: string;
    timeLastUpdated: string;
  }[];
}

export const isOwnedNFTsResponse = (
  response: unknown
): response is OwnedNFTsResponse => {
  if (typeof response !== 'object' || response === null) {
    return false;
  }
  const ownedNfts = (response as OwnedNFTsResponse).ownedNfts;
  if (!Array.isArray(ownedNfts)) {
    return false;
  }
  for (const ownedNft of ownedNfts) {
    if (typeof ownedNft.contract !== 'object') {
      return false;
    }
    if (typeof ownedNft.contract.address !== 'string') {
      return false;
    }
    if (typeof ownedNft.id !== 'object') {
      return false;
    }
    if (typeof ownedNft.id.tokenId !== 'string') {
      return false;
    }
    if (typeof ownedNft.id.tokenMetadata !== 'object') {
      return false;
    }
    if (typeof ownedNft.id.tokenMetadata.tokenType !== 'string') {
      return false;
    }

    if (!Array.isArray(ownedNft.media)) {
      return false;
    }
    for (const media of ownedNft.media) {
      if (typeof media !== 'object') {
        return false;
      }

      if (typeof media.gateway !== 'string') {
        return false;
      }
    }

    if (typeof ownedNft.metadata !== 'object') {
      return false;
    }
    if (typeof ownedNft.metadata.name !== 'string') {
      return false;
    }
    if (typeof ownedNft.title !== 'string') {
      return false;
    }
    if (typeof ownedNft.timeLastUpdated !== 'string') {
      return false;
    }
  }
  return true;
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
