import { useEffect, useState } from 'react';
import { EthAddress, isEthAddress } from '../../domain';
import { useWallet } from './useWallet';

export const useWalletAddress = (): EthAddress | null => {
  const [address, setAddress] = useState<EthAddress | null>(null);
  const [wallet] = useWallet();

  useEffect(() => {
    (async () => {
      if (wallet === null) {
        setAddress(null);
      } else if (wallet.id === 'signer wallet') {
        const address = await wallet.wallet.getAddress();
        if (!isEthAddress(address)) {
          throw new Error('Invalid address');
        } else {
          setAddress(address);
        }
      } else if (wallet.id === 'identity wallet') {
        if (!isEthAddress(wallet.wallet.address)) {
          throw new Error('Invalid address');
        } else {
          setAddress(wallet.wallet.address);
        }
      } else {
        throw new Error('useWalletAddress: unknown wallet type');
      }
    })();
  }, [wallet]);

  return address;
};
