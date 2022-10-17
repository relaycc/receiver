export const isLensName = (handle?: string | null): handle is string => {
  return (
    typeof handle === 'string' &&
    handle.endsWith('.lens') &&
    handle.length > 9 &&
    handle.length < 37
  );
};

export interface LensProfile {
  name: string;
  bio: string;
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    totalPosts: number;
    totalComments: number;
    totalMirrors: number;
    totalPublications: number;
    totalCollects: number;
  };
  handle: string;
  ownedBy: string;
  isDefault: boolean;
  picture: {
    uri: string;
    original: {
      url: string;
    };
  };
}

export interface LensProfilesQueryResponse {
  profiles: {
    items: LensProfile[];
  };
}

export const addressFromProfile = (profile: LensProfile): string => {
  return profile.ownedBy;
};

export const getMostFollowedProfile = (
  profilesQueryResponse: LensProfilesQueryResponse
): LensProfile | undefined => {
  try {
    return profilesQueryResponse.profiles.items.reduce((result, profile) => {
      if (profile.stats.totalFollowers > result.stats.totalFollowers) {
        return profile;
      } else {
        return result;
      }
    });
  } catch {
    return undefined;
  }
};

export const getFirstProfile = (
  profilesQueryResponse: LensProfilesQueryResponse
): LensProfile | undefined => {
  try {
    return profilesQueryResponse.profiles.items[0];
  } catch {
    return undefined;
  }
};

export const getDefaultProfile = (
  profilesQueryResponse: LensProfilesQueryResponse
): LensProfile | undefined => {
  try {
    return profilesQueryResponse.profiles.items.find(
      (profile) => profile.isDefault
    );
  } catch {
    return undefined;
  }
};

export const getLensterUrl = (lensProfile: LensProfile): string => {
  return 'https://lenster.xyz/u/' + lensProfile.handle;
};

export const gatewayFromIpfs = (ipfsUrl: string): string => {
  if (!ipfsUrl.startsWith('ipfs://')) {
    throw new Error('Did not pass an IPFS url!');
  } else {
    return 'https://gateway.ipfs.io/ipfs/' + ipfsUrl.slice(7);
  }
};

export const isIpfsUrl = (maybeIpfsUrl: string): boolean => {
  return maybeIpfsUrl.startsWith('ipfs://');
};
