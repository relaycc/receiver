import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  currentScreen,
  useConfig,
  usePinnedAddresses,
  useReceiver,
  useIgnoredAddresses,
  useRelayId,
  useClient,
  useEnsName,
  useLensProfile,
  isEnsName,
  isLensName,
  isEthAddress,
} from '../../hooks';
import { useIgnoreAddress, usePinAddress } from '../../hooks/xmtp/mutations';
import { AddressInfo } from './AddressInfo';
import { LoadingSpinner } from './LoadingSpinner';
import { Copy } from './Icons';
import { Avatar } from './Avatar';
import {
  GoToConversationsIcon,
  ExitIcon,
  MinimizeIcon,
  PinIcon,
  PinOffIcon,
  EyeIcon,
  EyeOffIcon,
  GoBackIcon,
} from './MenuIcons';

export const Header: FunctionComponent = () => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const screenHistory = useReceiver((state) => state.screenHistory);
  const screen = currentScreen({ screenHistory });

  const doClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const goToMenu = useCallback(() => {
    dispatch({ id: 'go to screen', screen: { id: 'menu' } });
  }, [dispatch]);

  if (screen.id === 'all conversations') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">All Conversations</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'pinned conversations') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">Pinned</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'ignored conversations') {
    return (
      <div className="Header HeaderWrapper">
        <GoToConversationsIcon onClick={goToMenu} />
        <h1 className="Header Title">Ignored</h1>
        <ExitIcon onClick={doClose} />
      </div>
    );
  } else if (screen.id === 'menu') {
    return <MenuScreenHeader />;
  } else if (screen.id === 'messages') {
    return <MessageScreenHeader handle={screen.handle} />;
  } else {
    throw new Error('Never should have been here!');
  }
};

const MessageScreenHeader = ({ handle }: { handle?: string | null }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const pinnedAddresses = usePinnedAddresses();
  const ignoredAddresses = useIgnoredAddresses();
  const relayId = useRelayId({ handle });
  const config = useConfig();
  const { pin, unpin } = usePinAddress(relayId.address.data);
  const { ignore, unignore } = useIgnoreAddress(relayId.address.data);

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
            ignoredAddresses.data.includes(relayId.address.data || '')
          ) {
            return (
              <EyeIcon
                marginLeft="auto"
                marginRight="6px"
                onClick={() => {
                  if (config === null) {
                    return;
                  } else {
                    unignore.mutate();
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
                  if (config === null) {
                    return;
                  } else {
                    ignore.mutate();
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
            pinnedAddresses.data.includes(relayId.address.data || '')
          ) {
            return (
              <PinOffIcon
                marginRight="6px"
                onClick={() => {
                  if (config === null) {
                    return;
                  } else {
                    unpin.mutate();
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
                  if (config === null) {
                    return;
                  } else {
                    pin.mutate();
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
          if (
            relayId.address.data === undefined ||
            relayId.address.data === null
          ) {
            return;
          } else {
            dispatch({
              id: 'add pinned conversation',
              peerAddress: relayId.address.data,
            });
            doClose();
          }
        }}
      />
      <ExitIcon onClick={doClose} />
    </div>
  );
};

const MenuScreenHeader = () => {
  const [didCopyToClipboard, setDidCopyToClipboard] = useState(false);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const [, clientQuery] = useClient();
  const handle = clientQuery.data?.address;
  const config = useConfig();
  const lensProfile = useLensProfile({
    handle,
  });
  const ensName = useEnsName({ handle });

  const primaryId = (() => {
    if (isLensName(lensProfile.data?.handle)) {
      return lensProfile.data?.handle;
    }
    if (isEnsName(ensName.data)) {
      return ensName.data;
    }
    if (isEthAddress(handle)) {
      return handle;
    }

    return 'Not Signed In';
  })();
  return (
    <div className="MenuScreenHeader">
      <div className="avatar">
        <Avatar
          size="xl"
          onClick={() => null}
          handle={clientQuery.data?.address}
        />
      </div>
      <div className="identity">
        <h3 className="username">
          {isEthAddress(primaryId) ? truncateAddress(primaryId) : primaryId}
        </h3>
        <h4
          className="address"
          onClick={() => {
            setDidCopyToClipboard(true);
            setTimeout(() => setDidCopyToClipboard(false), 1500);
            navigator.clipboard.writeText(String(clientQuery.data?.address));
          }}>
          {(() => {
            if (clientQuery.data?.address === undefined) {
              return 'No XMTP identity found...';
            } else {
              return (
                <>
                  {truncateAddress(clientQuery.data?.address)}
                  {didCopyToClipboard ? (
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>
                      Copied!
                    </span>
                  ) : (
                    <Copy className="MenuScreen CopyIcon" />
                  )}
                </>
              );
            }
          })()}
        </h4>
        <h4 className="xmtp-network">
          XMTP Network:{' '}
          <span
            className={`xmtp-network-name ${
              clientQuery.data ? undefined : 'not-connected'
            }`}>
            {(clientQuery.data && config?.xmtp.network) || 'Not Connected'}
          </span>
        </h4>
      </div>
      <ExitIcon onClick={() => setIsOpen(false)} />
    </div>
  );
};

function truncateAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}
