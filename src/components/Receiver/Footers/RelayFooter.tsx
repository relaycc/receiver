import React from "react";
import styled from "styled-components";
import Logo from "../../../assets/images/logo2.svg";

export function RelayFooter() {
  return (
    <Container>
      Powered by Relay
      <img src={Logo} />
    </Container>
  );
}

const Container = styled.div`
  color: #333333;
  width: 100%;
  min-height: 62px;
  box-shadow: 0px -4px 4px -4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 0px;
  bottom: 0px;
  text-align: center;
  font-family: "Poppins" sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  z-index: 1011;

  img {
    height: 25px;
    width: 25px;
    margin-left: 2px;
  }
`;
