import React from "react";
import Avatar from "./Avatar";
import styled from "styled-components";
import { EnsName } from "./EnsName";

interface MinimizeIconListProps {
  minimizedConvoList: any;
  setShowBox: any;
  setPeerAddress: any;
  setMinimizeConvoList: any;
  setShowConversations: any;
  setShowMewMessageDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MinimizeIconList({
  minimizedConvoList,
  setShowBox,
  setPeerAddress,
  setMinimizeConvoList,
  setShowConversations,
  setShowMewMessageDropdown,
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
            setShowConversations={setShowConversations}
            setShowMewMessageDropdown={setShowMewMessageDropdown}
          />
          <AvatarHoverDetails>
            <svg
              onClick={() => removeFromList(index)}
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              height={"16px"}
              width={"16px"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <EnsName
              setShowMewMessageDropdown={setShowMewMessageDropdown}
              setShowBox={setShowBox}
              setPeerAddress={setPeerAddress}
              setShowConversations={setShowConversations}
              address={e}
            />
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
  bottom: 136px;
  right: 25px;
  gap: 10px;
`;

const AvatarHoverDetails = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: none;
  cursor: pointer;
  `;

const AvatarContainer = styled.div`
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100000;


  :hover ${AvatarHoverDetails} {
    display: block;
  }
`;
