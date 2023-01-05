import React, { useState } from 'react';
import { isEthAddress, useXmtpClient } from '@relaycc/xmtp-hooks';
import { truncateAddress } from '../../../utils';
import {
  useEnsName,
  useLensProfile,
  useSetClosed,
  isLensName,
  isEnsName,
  useWalletAddress,
} from '../../../hooks';
import { ExitIcon, Copy, Avatar } from '../../Elements';

export const Header = () => {
  const walletAddress = useWalletAddress();
  const [didCopyToClipboard, setDidCopyToClipboard] = useState(false);
  const setClosed = useSetClosed();
  const client = useXmtpClient({ clientAddress: walletAddress });
  const lensProfile = useLensProfile({ handle: walletAddress });
  const ensName = useEnsName({ handle: walletAddress });

  const primaryId = (() => {
    if (isLensName(lensProfile.data?.handle)) {
      return lensProfile.data?.handle;
    }
    if (isEnsName(ensName.data)) {
      return ensName.data;
    }
    return walletAddress;
  })();
  return (
    <div className="MenuScreenHeader">
      <div className="avatar">
        <Avatar size="xl" onClick={() => null} handle={walletAddress} />
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
            navigator.clipboard.writeText(client.data?.address() || '');
          }}>
          {(() => {
            if (client.data?.address() === undefined) {
              return 'No XMTP identity found...';
            } else {
              return (
                <>
                  {truncateAddress(client.data.address())}
                  {didCopyToClipboard ? (
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>
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
      </div>
      <ExitIcon onClick={setClosed} />
    </div>
  );
};
