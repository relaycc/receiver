import styled from 'styled-components';
import React from 'react';

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
  &&& {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
  }
`;

const LoadingCircle = styled.div`
  &&& {
    color: white;
    height: 5px;
    width: 5px;
    background: #c3c2c2;
    border-radius: 50%;
    animation: relayReceiverPulse 1500ms ease-in-out infinite;

    @keyframes relayReceiverPulse {
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
  }
`;
const LoadingCircle2 = styled.div`
  &&& {
    color: white;
    height: 5px;
    width: 5px;
    background: #c3c2c2;
    border-radius: 50%;
    animation: relayReceiverPulse2 1500ms ease-in-out infinite;

    @keyframes relayReceiverPulse2 {
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
  }
`;
const LoadingCircle3 = styled.div`
  &&& {
    color: white;
    height: 5px;
    width: 5px;
    background: #c3c2c2;
    border-radius: 50%;
    animation: relayReceiverPulse3 1500ms ease-in-out infinite;

    @keyframes relayReceiverPulse3 {
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
  }
`;
