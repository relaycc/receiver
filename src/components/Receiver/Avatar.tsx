import { useState, useEffect } from 'react';
import { useEnsAvatar } from 'wagmi';
import styled from 'styled-components';
import Blockies from 'react-blockies';
import LoadingSpinner from './LoadingSpinner';
import React from 'react';

interface AvatarProps {
  address?: string;
  size?: 'small' | 'medium' | 'large';
  setPeerAddress?: (peerAddress: string | undefined) => unknown;
  setShowBox?: (show: boolean) => unknown;
  setShowConversations?: (show: boolean) => unknown;
  setShowMessageDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Avatar({
  address,
  size,
  setPeerAddress,
  setShowBox,
  setShowConversations,
  setShowMessageDropdown,
}: AvatarProps) {
  const {
    data: ensAvatar,
    isFetching,
    isLoading,
  } = useEnsAvatar({ addressOrName: address });
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    setShowLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);

  if (showLoading) {
    return <LoadingSpinner width={40} height={40} />;
  }

  const handleClick = () => {
    if (setShowBox) {
      setShowBox(true);
      setPeerAddress && setPeerAddress(address);
      setShowConversations && setShowConversations(false);
      setShowMessageDropdown && setShowMessageDropdown(false);
    }
  };

  if (!ensAvatar) {
    return (
      <AvatarContainer onClick={handleClick}>
        {address && <Blockies seed={address} size={10} scale={4} />}
      </AvatarContainer>
    );
  } else {
    return (
      <AvatarContainer>
        <AvatarImage
          onClick={handleClick}
          src={ensAvatar}
          size={size}
          alt="user"
        />
      </AvatarContainer>
    );
  }
}

const AvatarImage = styled.img<{ size?: 'large' | 'small' | 'medium' }>`
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  width: ${(p) => (p.size === 'large' ? '40px' : '40px')};
  height: ${(p) => (p.size === 'large' ? '40px' : '40px')};
`;

const AvatarContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  display: grid;
  place-content: center;
  overflow: hidden;
`;
