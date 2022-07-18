import styled from 'styled-components';
import background from '../../../public/assets/images/Artboard1.png';

export default function LoadingEnsName() {
  return (
    <MainContainer>
      <Background></Background>
      <Header>Resolving ENS Name...</Header>
      <DotContainer>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </DotContainer>
    </MainContainer>
  );
}

const Background = styled.div`
  width: 100vw;
  height: calc(100vh - 96px);
  margin-top: 96px;
  background: url(${background.src}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  position: fixed;
  z-index: -1;

  &:after {
    background: linear-gradient(60deg, rgba(16, 8, 23, 92.5%), #100817);
    display: block;
    content: '';
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const MainContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  z-index: -100;
`;

const Header = styled.h1`
  color: #7349e5;
  font-size: 2rem;
  text-align: center;
  margin-top: -20vh;
  margin-bottom: 50px;
  font-style: italic;
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  background: red;
  border-radius: 50%;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  > * {
    background: #c3c2c2;
  }

  > :first-child {
    animation: jump1 1500ms ease-in-out infinite;
    @keyframes jump1 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(-15px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(2) {
    animation: jump2 1500ms ease-in-out infinite;
    @keyframes jump2 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(-15px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(3) {
    animation: jump3 1500ms ease-in-out infinite;
    @keyframes jump3 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(-0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(-15px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(4) {
    animation: jump4 1500ms ease-in-out infinite;
    @keyframes jump4 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(-15px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(5) {
    animation: jump5 1500ms ease-in-out infinite;
    @keyframes jump5 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(-15px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(6) {
    animation: jump6 1500ms ease-in-out infinite;
    @keyframes jump6 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(-15px);
      }
      84% {
        transform: translateY(0px);
      }
      96% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
