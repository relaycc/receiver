import { EnsName, isEnsName } from '../ens';
import { EthAddress, isEthAddress } from '../eth';
import { isLensName, LensName } from '../lens';

export type Handle = EnsName | EthAddress | LensName;

export const isHandle = (handle: unknown): handle is Handle => {
  return isEnsName(handle) || isLensName(handle) || isEthAddress(handle);
};
