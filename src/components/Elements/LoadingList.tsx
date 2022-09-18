import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const LoadingList = () => {
  const divScrollToRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!divScrollToRef.current) return;
    divScrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <MainContainer>
      <div className="LoadingList LeftContainer">
        <LeftUserInfo>
          <div className="LoadingList LogoOutline" />
          <div className="LoadingList NameOutline" />
          <div className="LoadingList DateOutline" />
        </LeftUserInfo>
        <LeftMessageContainer>
          <div className="LoadingList FirstMessage" />
          <div className="LoadingList SecondMessage" />
        </LeftMessageContainer>
      </div>
      <div className="LoadingList RightContainer">
        <RightUserInfo>
          <div className="LoadingList LogoOutline" />
          <div className="LoadingList NameOutline" />
          <div className="LoadingList DateOutline" />
        </RightUserInfo>
        <RightMessageContainer>
          <div className="LoadingList FirstMessage" />
        </RightMessageContainer>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  &&& {
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;
    gap: 0.75rem;
    width: 100%;
    z-index: 10;
    max-height: 345px;
    padding: 12px;

    @keyframes slide {
      0% {
        /* background-position: left 100% bottom 50%; */
        background-color: #777;
      }
      40% {
        /* background-position: right 100% bottom 50%; */
        background-color: #cfcccc;
      }
      60% {
        /* background-position: right 100% bottom 50%; */
        background-color: #cfcccc;
      }
      100% {
        /* background-position: right 100% bottom 50%; */
        background-color: #777;
      }
    }
  }
`;

const LeftUserInfo = styled.div`
  &&& {
    display: flex;
    align-items: center;
    gap: 13px;
    > * {
      background-color: #777;
      opacity: 0.2;
      animation: slide 1500ms ease-in-out infinite;
    }
  }
`;

const RightUserInfo = styled.div`
  &&& {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 13px;
    > * {
      opacity: 0.2;
      background-color: #777;
      animation: slide 1500ms ease-in-out infinite;
    }
  }
`;

const LeftMessageContainer = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 9px;
    > * {
      background-color: #777;
      opacity: 0.2;
      animation: slide 1500ms ease-in-out infinite;
    }
  }
`;
const RightMessageContainer = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > * {
      background-color: #777;
      opacity: 0.2;
      animation: slide 1500ms ease-in-out infinite;
    }
  }
`;
