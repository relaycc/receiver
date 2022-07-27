import { useState, useEffect } from 'react';

export function useIsMetaMask() {
  const [isMetamask, setIsMetamask] = useState(false);

  useEffect(() => {
    if (window.ethereum !== undefined) {
      if (window.ethereum.isMetaMask === true) {
        setIsMetamask(true);
      } else {
        setIsMetamask(false);
      }
    } else setIsMetamask(false);
  }, []);

  return isMetamask;
}
