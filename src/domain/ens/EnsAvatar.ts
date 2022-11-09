import { isValidUrl } from '../util';

export type EnsAvatar = string;

export const isEnsAvatar = (avatar: unknown): avatar is EnsAvatar => {
  if (typeof avatar !== 'string') {
    return false;
  }
  if (!isValidUrl(avatar)) {
    return false;
  }
  return true;
};
