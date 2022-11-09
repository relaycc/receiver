import { EthAddress, isEthAddress } from '../eth';
import { isLensAvatar, LensAvatar } from './LensAvatar';
import { isLensName, LensName } from './LensName';

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

export const isLensProfile = (profile: unknown): profile is LensProfile => {
  try {
    return (
      typeof profile === 'object' &&
      profile !== null &&
      typeof (profile as LensProfile).name === 'string' &&
      typeof (profile as LensProfile).bio === 'string' &&
      typeof (profile as LensProfile).stats === 'object' &&
      typeof (profile as LensProfile).stats.totalFollowers === 'number' &&
      typeof (profile as LensProfile).stats.totalFollowing === 'number' &&
      typeof (profile as LensProfile).stats.totalPosts === 'number' &&
      typeof (profile as LensProfile).stats.totalComments === 'number' &&
      typeof (profile as LensProfile).stats.totalMirrors === 'number' &&
      typeof (profile as LensProfile).stats.totalPublications === 'number' &&
      typeof (profile as LensProfile).stats.totalCollects === 'number' &&
      typeof (profile as LensProfile).handle === 'string' &&
      typeof (profile as LensProfile).ownedBy === 'string' &&
      typeof (profile as LensProfile).isDefault === 'boolean' &&
      typeof (profile as LensProfile).picture === 'object' &&
      typeof (profile as LensProfile).picture.uri === 'string' &&
      typeof (profile as LensProfile).picture.original === 'object' &&
      typeof (profile as LensProfile).picture.original.url === 'string'
    );
  } catch {
    return false;
  }
};

export const addressFromProfile = (profile: LensProfile): EthAddress | null => {
  if (!isEthAddress(profile.ownedBy)) {
    return null;
  } else {
    return profile.ownedBy;
  }
};

export const avatarFromProfile = (profile: LensProfile): LensAvatar | null => {
  if (!isLensAvatar(profile.picture.uri)) {
    return null;
  } else {
    return profile.picture.uri;
  }
};

export const lensNameFromProfile = (profile: LensProfile): LensName | null => {
  if (!isLensName(profile.handle)) {
    return null;
  } else {
    return profile.handle;
  }
};
