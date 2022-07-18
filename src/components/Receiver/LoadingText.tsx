import styled from 'styled-components';

export default function LoadingText() {
  return (
    <LoadingCircleContainer>
      <LoadingCircle></LoadingCircle>
      <LoadingCircle2></LoadingCircle2>
      <LoadingCircle3></LoadingCircle3>
    </LoadingCircleContainer>
  );
}

const LoadingCircleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;

const LoadingCircle = styled.div`
  color: white;
  height: 5px;
  width: 5px;
  background: #c3c2c2;
  border-radius: 50%;
  animation: pulse 1500ms ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const LoadingCircle2 = styled.div`
  color: white;
  height: 5px;
  width: 5px;
  background: #c3c2c2;
  border-radius: 50%;
  animation: pulse2 1500ms ease-in-out infinite;

  @keyframes pulse2 {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const LoadingCircle3 = styled.div`
  color: white;
  height: 5px;
  width: 5px;
  background: #c3c2c2;
  border-radius: 50%;
  animation: pulse3 1500ms ease-in-out infinite;

  @keyframes pulse3 {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(0);
    }
    50% {
      transform: scale(0);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;
