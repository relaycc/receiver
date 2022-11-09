import React, { useCallback, useMemo } from 'react';
import {
  usePinnedAddresses,
  useReceiver,
  useIgnoredAddresses,
  useWalletAddress,
  useIgnoreAddress,
  usePinAddress,
  useLensAddress,
  useEnsAddress,
} from '../../../hooks';
import { AddressInfo } from '../AddressInfo/AddressInfo';
import { LoadingSpinner } from '../LoadingSpinner';
import {
  ExitIcon,
  MinimizeIcon,
  PinIcon,
  PinOffIcon,
  EyeIcon,
  EyeOffIcon,
  GoBackIcon,
} from '../MenuIcons';
import { Handle } from '../../../domain';

export const MessagesScreenHeader = ({ handle }: { handle: Handle }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const walletAddress = useWalletAddress();
  const pinnedAddresses = usePinnedAddresses(walletAddress);
  const ignoredAddresses = useIgnoredAddresses(walletAddress);
  const { pin, unpin } = usePinAddress();
  const { ignore, unignore } = useIgnoreAddress();
  const lensAddress = useLensAddress({ handle });
  const ensAddress = useEnsAddress({ handle });

  const peerAddress = useMemo(() => {
    if (lensAddress.data !== undefined && lensAddress.data !== null) {
      return lensAddress.data;
    } else if (ensAddress.data !== undefined && ensAddress.data !== null) {
      return ensAddress.data;
    } else {
      return undefined;
    }
  }, []);

  const doClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const goBack = useCallback(() => {
    dispatch({ id: 'go back screen' });
  }, [dispatch]);

  return (
    <div className="Header HeaderWrapper">
      <GoBackIcon marginRight="10px" onClick={goBack} />
      <AddressInfo handle={handle} />
      {(() => {
        if (
          ignore.isLoading ||
          unignore.isLoading ||
          ignoredAddresses.isLoading ||
          ignoredAddresses.isFetching
        ) {
          return <LoadingSpinner className="IgnoredLoadingSpinner" />;
        } else {
          if (
            ignoredAddresses.data === undefined ||
            (peerAddress !== undefined &&
              ignoredAddresses.data.addresses.includes(peerAddress))
          ) {
            return (
              <EyeIcon
                marginLeft="auto"
                marginRight="6px"
                onClick={() => {
                  if (peerAddress === undefined) {
                    return;
                  } else {
                    unignore.mutate({ peerAddress });
                  }
                }}
                className="IgnoreIcon"
              />
            );
          } else {
            return (
              <EyeOffIcon
                marginLeft="auto"
                marginRight="6px"
                onClick={() => {
                  if (peerAddress === undefined) {
                    return;
                  } else {
                    ignore.mutate({ peerAddress });
                  }
                }}
                className="IgnoreIcon"
              />
            );
          }
        }
      })()}
      {(() => {
        if (
          pin.isLoading ||
          unpin.isLoading ||
          pinnedAddresses.isLoading ||
          pinnedAddresses.isFetching
        ) {
          return <LoadingSpinner className="PinnedLoadingSpinner" />;
        } else {
          if (
            pinnedAddresses.data === undefined ||
            (peerAddress !== undefined &&
              pinnedAddresses.data.addresses.includes(peerAddress))
          ) {
            return (
              <PinOffIcon
                marginRight="6px"
                onClick={() => {
                  if (peerAddress === undefined) {
                    return;
                  } else {
                    unpin.mutate({ peerAddress });
                  }
                }}
                className="PinIcon"
              />
            );
          } else {
            return (
              <PinIcon
                marginRight="6px"
                onClick={() => {
                  if (peerAddress === undefined) {
                    return;
                  } else {
                    pin.mutate({ peerAddress });
                  }
                }}
                className="PinIcon"
              />
            );
          }
        }
      })()}
      <MinimizeIcon
        onClick={() => {
          if (peerAddress === undefined) {
            return;
          } else {
            dispatch({
              id: 'add pinned conversation',
              peerAddress,
            });
            doClose();
          }
        }}
      />
      <ExitIcon onClick={doClose} />
    </div>
  );
};
