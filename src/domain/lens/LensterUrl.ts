import { isValidUrl } from '../util';
import { LensName } from './LensName';

type LensterUrlPrefix = 'https://lenster.xyz/u/';
export type LensterUrl = `${LensterUrlPrefix}${LensName}`;

export const isLensterUrl = (url: unknown): url is LensterUrl => {
  if (typeof url !== 'string') {
    return false;
  }
  if (!url.match(/^https:\/\/lenster.xyz\/u\/[a-z0-9]{8,36}\.lens$/)) {
    return false;
  }
  if (!isValidUrl(url)) {
    return false;
  }
  return true;
};
