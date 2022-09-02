import React from 'react';
import Avatar from './Avatar';
import styled from 'styled-components';

type MinimizedConvoListSetter = (list: string[]) => string[];

interface MinimizeIconListProps {
  minimizedConvoList: string[];
  setShowBox: (show: boolean) => unknown;
  setPeerAddress: (peerAddress: string | undefined) => unknown;
  setMinimizeConvoList: (setter: MinimizedConvoListSetter) => unknown;
  setShowConversations: (show: boolean) => unknown;
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
  const removeFromList = (e: number) => {
    setMinimizeConvoList((items: string[]) =>
      items.filter((_: unknown, i: number) => i !== e)
    );
  };

  return (
    <Container>
      {minimizedConvoList.map((e, index) => (
        <AvatarContainer key={e}>
          <Avatar
            setPeerAddress={setPeerAddress}
            setShowBox={setShowBox}
            address={e}
            setShowConversations={setShowConversations}
            setShowMessageDropdown={setShowMewMessageDropdown}
          />
          <AvatarHoverDetails onClick={() => removeFromList(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              height={'16px'}
              width={'16px'}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </AvatarHoverDetails>
        </AvatarContainer>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: fixed;
  bottom: 60px;
  right: 24px;
  gap: 10px;
  list-style: none;
  list-style-type: none;
`;

const AvatarHoverDetails = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  position: absolute;
  right: -5px;
  top: -5px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: none;
  z-index: 100000;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  :hover ${AvatarHoverDetails} {
    font-weight: 500;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    display: block;
  }
`;
