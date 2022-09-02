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
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  
`;

const BlockiesContainer = styled.div`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
`;
