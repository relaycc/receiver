import { useState, useEffect } from "react";
import { useEnsAvatar } from "wagmi";
import styled from "styled-components";
import Blockies from "react-blockies";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";

interface AvatarProps {
  address?: any;
  size?: "small" | "medium" | "large";
  setPeerAddress?: any;
  setShowBox?: any;
}
export default function Avatar({
  address,
  size,
  setPeerAddress,
  setShowBox,
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
      setPeerAddress(address);
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

const AvatarImage = styled.img<{ size?: "large" | "small" | "medium" }>`
  width: ${(p) => (p.size === "large" ? "40px" : "40px")};
  height: ${(p) => (p.size === "large" ? "40px" : "40px")};
`;

const AvatarContainer = styled.div`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  display: grid;
  place-content: center;
  overflow: hidden;
`;
