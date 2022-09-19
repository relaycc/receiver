import React, { FunctionComponent } from 'react';
import Blockies from 'react-blockies';
import LoadingSpinner from './LoadingSpinner';
import {
  useEnsName,
  useEnsAddress,
  useLensAddress,
  isEthAddress,
  isLensName,
  isEnsName,
  useEnsAvatar,
} from '../../hooks';

export interface AvatarProps {
  handle?: string | null;
  onClick: () => unknown;
  large?: boolean;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  handle,
  onClick,
  large,
}) => {
  const lensAddress = useLensAddress({
    handle: isLensName(handle) ? handle : null,
  });
  const ensAddress = useEnsAddress({
    handle: isEnsName(handle) ? handle : null,
  });
  const ens = useEnsName({ handle: isEthAddress(handle) ? handle : null });
  const avatar = useEnsAvatar({
    handle:
      lensAddress.address || ensAddress.address || ens.name || handle || 'TODO',
  });

  if (avatar.status === 'fetching') {
    return <LoadingSpinner width={large ? 50 : 40} height={large ? 50 : 40} />;
  } else if (!avatar.avatar) {
    return (
      <div
        className={`Avatar BlockiesContainer large-${large}`}
        onClick={onClick}>
        <Blockies
          seed={handle || 'no address'}
          size={10}
          scale={large ? 5 : 4}
          className={'circle'}
        />
      </div>
    );
  } else {
    return (
      <img
        className={`Avatar AvatarImage large-${large}`}
        onClick={onClick}
        src={avatar.avatar}
        alt="user"
      />
    );
  }
};
