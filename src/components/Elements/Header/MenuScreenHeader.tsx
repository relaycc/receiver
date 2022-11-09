import React, { useState } from 'react';
import {
  useConfig,
  useReceiver,
  useClient,
  useEnsName,
  useLensProfile,
  useWalletAddress,
} from '../../../hooks';
import { Copy } from '../Icons';
import { Avatar, AvatarView } from '../Avatar';
import { ExitIcon } from '../MenuIcons';
import { isEthAddress, isLensName, isEnsName } from '../../../domain';

export const MenuScreenHeader = () => {
  const [didCopyToClipboard, setDidCopyToClipboard] = useState(false);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const walletAddress = useWalletAddress();
  const client = useClient(walletAddress);
  const config = useConfig();
  const lensProfile = useLensProfile({
    handle: client.data?.address,
  });
  const ensName = useEnsName({ handle: client.data?.address });

  const primaryId = (() => {
    if (isLensName(lensProfile.data?.handle)) {
      return lensProfile.data?.handle;
    }
    if (isEnsName(ensName.data)) {
      return ensName.data;
    }
    if (isEthAddress(client.data?.address)) {
      return client.data?.address;
    }
    return 'Not Signed In';
  })();
  return (
    <div className="MenuScreenHeader">
      <div className="avatar">
        {(() => {
          if (client.data?.address === undefined) {
            return <AvatarView.View status="fallback" size="xl" />;
          } else {
            <Avatar
              size="xl"
              onClick={() => null}
              handle={client.data.address}
            />;
          }
        })()}
      </div>
      <div className="identity">
        <h3 className="username">
          {isEthAddress(primaryId) && typeof primaryId === 'string'
            ? truncateAddress(primaryId)
            : primaryId}
        </h3>
        <h4
          className="address"
          onClick={() => {
            setDidCopyToClipboard(true);
            setTimeout(() => setDidCopyToClipboard(false), 1500);
            navigator.clipboard.writeText(String(client.data?.address));
          }}>
          {(() => {
            if (client.data?.address === undefined) {
              return 'No XMTP identity found...';
            } else {
              return (
                <>
                  {truncateAddress(client.data?.address)}
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
              client.data ? undefined : 'not-connected'
            }`}>
            {(client.data && config?.xmtp.network) || 'Not Connected'}
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
