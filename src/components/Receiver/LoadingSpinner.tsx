import styled, { keyframes } from 'styled-components';
import React from 'react';

interface LoaderProps {
  height: number;
  width: number;
}
export default function LoadingSpinner(props: LoaderProps) {
  const { height, width } = props;

  return (
    <Container width={width} height={height}>
      <img
        src={
          'https://relay-receiver-prod.s3.amazonaws.com/MobileLoadingSpinner.svg'
        }
        alt="loading"
        width={width}
        height={height}
      />
    </Container>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<LoaderProps>`
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  animation: ${spin} 1500ms linear infinite;
  width: max-content;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
`;
