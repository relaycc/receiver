import styled from 'styled-components';
import LoadingText from './LoadingText';
import React from 'react';

interface ConnectorProps {
  hoverLogo: string;
  name: string;
  onClick: () => unknown;
  connectState?: 'connecting' | 'connected';
}

interface LogoProps {
  hoverLogo?: string;
}

export default function Connector(props: ConnectorProps) {
  const { hoverLogo, name } = props;

  return (
    <>
      <LogoContainer>
        <img src={hoverLogo} width={30} height={30} />
      </LogoContainer>
      <>{name}</>
      <ConnectStatus>
        {props.connectState === 'connecting' && <LoadingText />}
      </ConnectStatus>
    </>
  );
}

const LogoContainer = styled.div<LogoProps>`
  &&& {
    height: 30px;
    width: 30px;
    justify-self: flex-start;
    transition: background-image 400ms;
    background-size: 30px;
    background-image: url(${(props) => props.hoverLogo});
  }
`;

const ConnectStatus = styled.div`
  &&& {
    justify-self: flex-end;
    width: 35px;
  }
`;
