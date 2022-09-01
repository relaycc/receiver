import React from 'react';
import styled from 'styled-components';
import { useEnsAvatar } from 'wagmi';
import Blockies from 'react-blockies';

interface AvatarProps {
  peerAddress: string;
}

export default function Avatar({ peerAddress }: AvatarProps) {
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: peerAddress });

  if (!ensAvatar) {
    return (
      <BlockiesContainer>
        <Blockies
          seed={peerAddress?.toLowerCase() || ''}
          size={10}
          scale={4}
          className={'circle'}
        />
      </BlockiesContainer>
    );
  } else {
    return <AvatarImage src={ensAvatar} alt="user" />;
  }
}

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const BlockiesContainer = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
`;
