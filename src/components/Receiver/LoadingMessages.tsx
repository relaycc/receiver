import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function LoadingMessages() {
  const divScrollToRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!divScrollToRef.current) return;
    divScrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <MainContainer>
      <LeftContainer>
        <LeftUserInfo>
          <LogoOutline />
          <NameOutline />
          <DateOutline />
        </LeftUserInfo>
        <LeftMessageContainer>
          <FirstMessage />
          <SecondMessage />
        </LeftMessageContainer>
      </LeftContainer>
      <RightContainer>
        <RightUserInfo>
          <LogoOutline />
          <NameOutline />
          <DateOutline />
        </RightUserInfo>
        <RightMessageContainer>
          <FirstMessage />
        </RightMessageContainer>
      </RightContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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
`;
const LeftContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
const RightContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
const LeftUserInfo = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 13px;
  > * {
    margin: 0;
    padding: 0;
    font-weight: 500;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: #777;
    opacity: 0.2;
    animation: slide 1500ms ease-in-out infinite;
  }
`;
const RightUserInfo = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 13px;
  > * {
    opacity: 0.2;
    background-color: #777;
    animation: slide 1500ms ease-in-out infinite;
  }
`;
const LogoOutline = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;
const NameOutline = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  height: 22px;
  width: 78px;
  border-radius: 8px;
`;
const DateOutline = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  width: 96px;
  height: 17px;
  border-radius: 8px;
`;
const LeftMessageContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 9px;
  > * {
    margin: 0;
    padding: 0;
    font-weight: 500;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: #777;
    opacity: 0.2;
    animation: slide 1500ms ease-in-out infinite;
  }
`;
const RightMessageContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin: 0;
    padding: 0;
    font-weight: 500;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: #777;
    opacity: 0.2;
    animation: slide 1500ms ease-in-out infinite;
  }
`;
const FirstMessage = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  width: 355px;
  height: 60px;
  border-radius: 8px;
`;
const SecondMessage = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  width: 155px;
  height: 60px;
  border-radius: 8px;
`;
