import React from 'react';
import styled from 'styled-components';

export function RelayFooter() {
  return (
    <Container>
      <Span>Powered by</Span>
      <Div>
        <img src={'https://relay-receiver-prod.s3.amazonaws.com/xmtp.png'} />
        <CompanyName>Xmtp</CompanyName>
      </Div>
    </Container>
  );
}

const Container = styled.div`
  letter-spacing: normal;
  margin: 0;
  padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: #333333;
  width: 100%;
  min-height: 62px;
  box-shadow: 0px -4px 4px -4px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 0px;
  bottom: 0px;
  text-align: center;
  font-family: 'Poppins' sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  z-index: 1011;
  background-color: white;
  width: 375px;

  img {
    height: 27px;
    width: 29px;
    margin-left: 2px;
  }
`;

const Span = styled.span`
  text-align: center;
  font-family: 'Poppins' sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: rgb(0, 0, 0, 0.45);
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  transform: scaleY(0.85);

  > img {
    height: 25px;
    width: 25px;
  }
`;

const CompanyName = styled.span`
  letter-spacing: 1.1;
  transform: scaleY(0.95);
  letter-spacing: 1.1;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  font-family: 'Poppins' sans-serif;
  font-style: normal;
  text-transform: uppercase;
`;
