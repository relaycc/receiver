import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useEnsAvatar } from '../../hooks';
import Blockies from 'react-blockies';
import LoadingSpinner from './LoadingSpinner';
import { useEnsName, useEnsAddress, useLensAddress } from '../../hooks';

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
  const lensAddress = useLensAddress({ handle });
  const ensAddress = useEnsAddress({ handle });
  const ens = useEnsName({ handle });
  const avatar = useEnsAvatar({
    handle:
      lensAddress.address || ensAddress.address || ens.name || handle || 'TODO',
  });

  if (avatar.status === 'fetching') {
    return <LoadingSpinner width={large ? 50 : 40} height={large ? 50 : 40} />;
  } else if (!avatar.avatar) {
    return (
      <BlockiesContainer onClick={onClick} large={large}>
        <Blockies
          seed={handle || 'no address'}
          size={10}
          scale={large ? 5 : 4}
          className={'circle'}
        />
      </BlockiesContainer>
    );
  } else {
    return (
      <AvatarImage
        onClick={onClick}
        src={avatar.avatar}
        alt="user"
        large={large}
      />
    );
  }
};

const AvatarImage = styled.img<{ large?: boolean }>`
  &&& {
    border-radius: 50%;
    width: ${(p) => (p.large ? '50px' : '40px')};
    height: ${(p) => (p.large ? '50px' : '40px')};
  }
`;

const BlockiesContainer = styled.div<{ large?: boolean }>`
  &&& .circle {
    border-radius: 50%;
    width: ${(p) => (p.large ? '50px' : '40px')};
    height: ${(p) => (p.large ? '50px' : '40px')};
    overflow: hidden;
  }
`;
