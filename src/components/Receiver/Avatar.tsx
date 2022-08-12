import { useState, useEffect } from 'react';
import { useEnsAvatar } from 'wagmi';
import styled from 'styled-components';
import Blockies from 'react-blockies';
import LoadingSpinner from './LoadingSpinner';
import React from 'react'

interface AvatarProps {
  address?: string | undefined;
  size?: 'small' | 'medium' | 'large';
}
export default function Avatar(props: AvatarProps) {
  const {
    data: ensAvatar,
    isFetching,
    isLoading,
  } = useEnsAvatar({ addressOrName: props.address });
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    setShowLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);

  if (showLoading) {
    return <LoadingSpinner width={40} height={40} />;
  }

  if (!ensAvatar) {
    return (
      <AvatarBlockieContainer>
        <Blockies
          seed={props.address || ''}
          size={10}
          scale={4}
        />
      </AvatarBlockieContainer>
    );
  } else {
    return <AvatarImage src={ensAvatar} size={props.size} alt="user" />;
  }
}

const AvatarImage = styled.img<{ size?: 'large' | 'small' | 'medium' }>`
  border-radius: 16px;
  width: ${(p) => (p.size === 'large' ? '40px' : '40px')};
  height: ${(p) => (p.size === 'large' ? '40px' : '40px')};
`;

const AvatarBlockieContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  overflow: hidden;
`;
