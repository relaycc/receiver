import React, { FunctionComponent, useState } from 'react';
import Blockies from 'react-blockies';
import {
  useEnsName,
  useEnsAddress,
  useLensAddress,
  isEthAddress,
  isLensName,
  isEnsName,
  useEnsAvatar,
} from '../../hooks';
import { motion } from 'framer-motion';

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
  const [showImage, setShowImage] = useState(false);
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

  if (!avatar.avatar) {
    return (
      <div
        style={{ opacity: avatar.status === 'fetching' ? 0.2 : 1 }}
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
      <motion.img
        initial={{ opacity: 0.2 }}
        animate={{ opacity: showImage ? 1 : 0.2 }}
        transition={{ duration: 0.5, delay: 0 }}
        className={`Avatar AvatarImage large-${large}`}
        onClick={onClick}
        onLoad={() => setShowImage(true)}
        src={avatar.avatar}
        alt="user"
      />
    );
  }
};
