import { useState, useEffect } from 'react';
import { useProvider } from './useProvider';
import { EnsAvatar, isEnsName, isEthAddress } from './types';

const cache: Record<string, EnsAvatar | undefined> = {};

export const useEnsAvatar = ({
  handle,
}: {
  handle?: string | null;
}): EnsAvatar => {
  const provider = useProvider();
  const [state, setState] = useState<EnsAvatar>({
    avatar: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchAvatar = async (handle: string) => {
      setState({ status: 'fetching', avatar: undefined });
      const avatar = await provider.getAvatar(handle);
      const result: EnsAvatar =
        avatar === null
          ? { status: 'settled', avatar: undefined }
          : { status: 'settled', avatar: avatar || undefined };
      cache[handle] = result;
      setState(result);
    };

    if (!isEnsName(handle) && !isEthAddress(handle)) {
      setState({ avatar: undefined, status: 'noop' });
    } else {
      const cached = cache[handle];
      if (cached) {
        setState(cached);
      } else {
        fetchAvatar(handle);
      }
    }
  }, [handle]);

  return state;
};
