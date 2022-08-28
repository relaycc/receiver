import React from "react";
import Avatar from "./Avatar";
import styled from "styled-components";

interface MinimizeIconListProps {
  minimizedConvoList: any;
  setShowBox: any;
  setPeerAddress: any;
  setMinimizeConvoList: any;
}
export function MinimizeIconList({
  minimizedConvoList,
  setShowBox,
  setPeerAddress,
  setMinimizeConvoList,
}: MinimizeIconListProps) {
  const removeFromList = (e: any) => {
    setMinimizeConvoList((items: any) =>
      items.filter((_: any, i: number) => i !== e)
    );
  };

  return (
    <Container>
      {minimizedConvoList.map((e: any, index: number) => (
        <AvatarContainer key={e}>
          <Avatar
            setPeerAddress={setPeerAddress}
            setShowBox={setShowBox}
            address={e}
          />
          <AvatarHoverDetails onClick={() => removeFromList(index)}>
            <svg
              fill="none"
              viewBox="0 0 28 28"
              strokeWidth={2.5}
              stroke="black"
              height="16px"
              width="16px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </AvatarHoverDetails>
        </AvatarContainer>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: fixed;
  bottom: 123px;
  right: 45px;
  gap: 10px;
`;

const AvatarHoverDetails = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  display: none;
  z-index: 100000;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  :hover ${AvatarHoverDetails} {
    display: block;
  }
`;
