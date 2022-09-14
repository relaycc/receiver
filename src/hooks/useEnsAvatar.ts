import { useState, useEffect } from 'react';
import { useProvider } from './useProvider';
import { EnsAvatar } from './types';
import { setEnsAvatar, getEnsAvatar } from '../utils';

export const useEnsAvatar = ({
  handle,
}: {
  handle?: string | null;
}): EnsAvatar => {
  const provider = useProvider();
  const [state, setState] = useState<EnsAvatar>(
    (handle && getEnsAvatar(handle)) || {
      avatar: undefined,
      status: 'noop',
    }
  );

  useEffect(() => {
    if (typeof handle === 'string') {
      const listener = () => {
        if (typeof handle === 'string') {
          const cached = getEnsAvatar(handle);
          if (cached) {
            setState(cached);
          }
        }
      };
      document.addEventListener(handle + 'ens avatar cache update', listener);
      return () => {
        document.removeEventListener(
          handle + 'ens avatar cache update',
          listener
        );
      };
    }
  }, [handle]);

  useEffect(() => {
    const fetchAvatar = async (handle: string) => {
      setEnsAvatar(handle, { status: 'fetching', avatar: undefined });
      setState({ status: 'fetching', avatar: undefined });
      const avatar = await provider.getAvatar(handle);
      const result: EnsAvatar =
        avatar === null
          ? { status: 'settled', avatar: undefined }
          : { status: 'settled', avatar: avatar || undefined };
      setEnsAvatar(handle, result);
      setState(result);
    };

    if (typeof handle === 'string') {
      const cached = getEnsAvatar(handle);
      if (cached) {
        setState(cached);
      } else {
        fetchAvatar(handle);
      }
    }
  }, [handle]);

  return state;
};
