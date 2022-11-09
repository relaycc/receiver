import { isValidUrl } from '../util';

export type LensAvatar = string;

export const isLensAvatar = (avatar: unknown): avatar is LensAvatar => {
  if (typeof avatar !== 'string') {
    return false;
  }
  if (!isValidUrl(avatar)) {
    return false;
  }
  return true;
};
