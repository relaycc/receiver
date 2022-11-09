import { EthAddress } from '../../eth';

export type Wallet = SignerWallet | IdentityWallet;

export interface SignerWallet {
  id: 'signer wallet';
  wallet: {
    getAddress: () => Promise<string>;
    signMessage: (message: string) => Promise<string>;
  };
}

export interface IdentityWallet {
  id: 'identity wallet';
  wallet: {
    address: EthAddress;
    uuid: string;
  };
}

export const isIdentityWallet = (wallet: unknown): wallet is IdentityWallet => {
  if (typeof wallet !== 'object' || wallet === null) {
    return false;
  }
  if ((wallet as IdentityWallet).id !== 'identity wallet') {
    return false;
  }
  if (typeof (wallet as IdentityWallet).wallet !== 'object') {
    return false;
  }
  if (typeof (wallet as IdentityWallet).wallet.address !== 'string') {
    return false;
  }
  if (typeof (wallet as IdentityWallet).wallet.uuid !== 'string') {
    return false;
  }
  return true;
};
