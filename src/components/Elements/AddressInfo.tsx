import React, { FunctionComponent, useState } from 'react';
import { truncateAddress } from '../../utils/address';
import { Avatar } from './Avatar';
import { LoadingText } from './LoadingText';
import { isEthAddress, useRelayId } from '../../hooks';

export interface AddressInfoProps {
  handle?: string | null;
}

export const AddressInfo: FunctionComponent<AddressInfoProps> = ({
  handle,
}) => {
  const relayId = useRelayId({ handle });
  const [isOpen, setIsOpen] = useState(false);
  const [didCopyToClipboard, setDidCopyToClipboard] = useState(false);

  const primaryIdIsLoading =
    relayId.lens.isLoading ||
    relayId.ens.isLoading ||
    relayId.address.isLoading;
  const primaryId = (() => {
    if (relayId.lens.data !== null && relayId.lens.data !== undefined) {
      return relayId.lens.data;
    } else if (relayId.ens.data !== null && relayId.ens.data !== undefined) {
      return relayId.ens.data;
    } else {
      return handle;
    }
  })();

  const secondaryIdIsLoading = relayId.address.isLoading;
  const secondaryId = (() => {
    return relayId.address.data;
  })();

  return (
    <div
      className="AddressInfo Container"
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <Avatar handle={handle} onClick={() => null} />
      <div className="AddressInfo TextContainer">
        {primaryIdIsLoading && <LoadingText />}
        {primaryIdIsLoading || (
          <div className="AddressInfo MainText">
            {isEthAddress(primaryId) ? truncateAddress(primaryId) : primaryId}
          </div>
        )}
        {secondaryIdIsLoading && <LoadingText />}
        {secondaryIdIsLoading || (
          <div className="AddressInfo SubText">
            {(() => {
              if (
                typeof secondaryId === 'string' &&
                isEthAddress(secondaryId)
              ) {
                return truncateAddress(secondaryId);
              } else {
                return secondaryId;
              }
            })()}
          </div>
        )}
        <div className="AddressInfo DropdownMenu">
          <li
            className="AddressInfo DropdownItem"
            onClick={() => {
              setDidCopyToClipboard(true);
              setTimeout(() => setDidCopyToClipboard(false), 3000);
              navigator.clipboard.writeText(String(secondaryId));
            }}>
            {didCopyToClipboard || 'Copy Address'}
            {didCopyToClipboard && 'Copied'}
            <CopyClipboardIcon />
          </li>
          <li className="AddressInfo DropdownItem">
            <a
              className="AddressInfo LiLink"
              href={'https://relay.cc/u/' + secondaryId}
              target="_blank"
              rel="noreferrer">
              Relay
              <GoToRelayIcon />
            </a>
          </li>
          <li className="AddressInfo DropdownItem">
            <a
              className="AddressInfo LiLink"
              href={'https://etherscan.io/address/' + secondaryId}
              target="_blank"
              rel="noreferrer">
              Etherscan
              <EtherscanIcon />
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

const CopyClipboardIcon = () => {
  return (
    <svg
      style={{ paddingRight: '2px' }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
};

const GoToRelayIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
};

const EtherscanIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
};
