import { EthAddress, isEthAddress } from '../eth';
import { LensProfile, isLensProfile } from './LensProfile';

export interface LensProfilesQueryResponse {
  profiles: {
    items: LensProfile[];
  };
}

export const isLensProfilesQueryResponse = (
  obj: unknown
): obj is LensProfilesQueryResponse => {
  try {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }
    if (!Array.isArray((obj as LensProfilesQueryResponse).profiles.items)) {
      return false;
    }
    const items = (obj as LensProfilesQueryResponse).profiles.items;
    for (const item of items) {
      if (!isLensProfile(item)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
};

export const getAddress = (
  lensProfilesQueryResponse: LensProfilesQueryResponse
): EthAddress | null => {
  if (!isEthAddress(lensProfilesQueryResponse.profiles.items[0].ownedBy)) {
    return null;
  } else {
    return lensProfilesQueryResponse.profiles.items[0].ownedBy;
  }
};

export const getDefaultProfile = (
  lensProfilesQueryResponse: LensProfilesQueryResponse
): LensProfile | null => {
  const defaultProfile = lensProfilesQueryResponse.profiles.items.find(
    (profile) => profile.isDefault
  );
  if (!isLensProfile(defaultProfile)) {
    return null;
  } else {
    return defaultProfile;
  }
};

export const getFirstProfile = (
  lensProfilesQueryResponse: LensProfilesQueryResponse
): LensProfile | null => {
  const firstProfile = lensProfilesQueryResponse.profiles.items[0];
  if (!isLensProfile(firstProfile)) {
    return null;
  } else {
    return firstProfile;
  }
};

export const getMostFollowedProfile = (
  lensProfilesQueryResponse: LensProfilesQueryResponse
): LensProfile | null => {
  const profile = lensProfilesQueryResponse.profiles.items.reduce(
    (result, profile) => {
      if (profile.stats.totalFollowers > result.stats.totalFollowers) {
        return profile;
      } else {
        return result;
      }
    }
  );
  if (!isLensProfile(profile)) {
    return null;
  } else {
    return profile;
  }
};
