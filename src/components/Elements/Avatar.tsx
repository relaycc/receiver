import React, { FunctionComponent } from 'react';
import Blockies from 'react-blockies';
import { useEnsAddress, useEnsAvatar } from '../../hooks/ens';
import { useLensAddress, isLensName, isEthAddress } from '../../hooks';
import { motion } from 'framer-motion';
// import { useEns } from '../../hooks/ens/queries';

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
    handle,
  });
  const ensAvatar = useEnsAvatar({
    handle: isEthAddress(handle)
      ? handle
      : isEthAddress(lensAddress.address)
      ? lensAddress.address
      : isEthAddress(ensAddress.data)
      ? ensAddress.data
      : undefined,
  });

  if (!ensAvatar.data) {
    return (
      <div
        style={{ opacity: ensAvatar.isLoading ? 0.2 : 1 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
        className={`Avatar AvatarImage large-${large}`}
        onClick={onClick}
        src={ensAvatar.data}
        alt="user"
      />
    );
  }
};
