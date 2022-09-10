import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useEnsAvatar } from '../../hooks';
import Blockies from 'react-blockies';
import LoadingSpinner from './LoadingSpinner';

interface AvatarProps {
  peerAddress: string;
  onClick: () => unknown;
  large?: boolean;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  peerAddress,
  onClick,
  large,
}) => {
  const {
    data: ensAvatar,
    isFetching,
    isLoading,
  } = useEnsAvatar({ addressOrName: peerAddress });

  if (isFetching || isLoading) {
    return <LoadingSpinner width={large ? 50 : 40} height={large ? 50 : 40} />;
  } else if (!ensAvatar) {
    return (
      <BlockiesContainer onClick={onClick} large={large}>
        <Blockies
          seed={peerAddress}
          size={10}
          scale={large ? 5 : 4}
          className={'circle'}
        />
      </BlockiesContainer>
    );
  } else {
    return (
      <AvatarImage onClick={onClick} src={ensAvatar} alt="user" large={large} />
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
