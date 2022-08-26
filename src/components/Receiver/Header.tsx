import styled from "styled-components";
import CloseReceiverLine from "../../assets/images/close-receiver-line.svg";
import CloseReceiverX from "../../assets/images/close-x.svg";
import ArrowUp from "../../assets/images/arrowUp.svg";
import { truncateAddress } from "../../utls/address";

import React from "react";
import { FetchEnsNameResult } from "@wagmi/core";

interface HeaderProps {
  text: string | null;
  visible: boolean;
  peerAddress: string | undefined;
  peerName: FetchEnsNameResult | undefined;
  toggleReceiver: () => unknown;
  closeReceiver: () => unknown;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RelayHeader({
  text = "Relay Receiver",
  visible,
  peerAddress,
  peerName,
  toggleReceiver,
  closeReceiver,
  setShowConversations,
}: HeaderProps) {
  const headerText = () => {
    if (text) {
      return <SoloTextContainer>{text}</SoloTextContainer>;
    }

    if (peerName) {
      return (
        <TextContainer>
          <MainText>{peerName}</MainText>
          <SubText>{peerAddress && truncateAddress(peerAddress)}</SubText>
        </TextContainer>
      );
    } else {
      return (
        <SoloTextContainer>
          {peerAddress && truncateAddress(peerAddress)}
        </SoloTextContainer>
      );
    }
  };

  const handleClick = () => {
    setShowConversations(true);
  };

  return (
    <Header>
      <GoBackSvgContainer onClick={handleClick}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20px"
          height="20px"
          viewBox="0 0 493.578 493.578"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M487.267,225.981c0-17.365-13.999-31.518-31.518-31.518H194.501L305.35,83.615c12.24-12.24,12.24-32.207,0-44.676
		L275.592,9.18c-12.24-12.24-32.207-12.24-44.676,0L15.568,224.527c-6.12,6.12-9.256,14.153-9.256,22.262
		c0,8.032,3.136,16.142,9.256,22.262l215.348,215.348c12.24,12.239,32.207,12.239,44.676,0l29.758-29.759
		c12.24-12.24,12.24-32.207,0-44.676L194.501,299.498h261.094c17.366,0,31.519-14.153,31.519-31.519L487.267,225.981z"
            />
          </g>
        </svg>
        {headerText()}
      </GoBackSvgContainer>
      <RightIconContainer>
        {visible ? (
          <MinimizeContainer>
            <img
              src={CloseReceiverLine}
              width={12}
              height={13}
              alt="relay"
              onClick={toggleReceiver}
            />
          </MinimizeContainer>
        ) : (
          <MinimizeContainer>
            <img
              src={ArrowUp}
              width={18}
              height={13}
              alt="relay"
              onClick={toggleReceiver}
            />
          </MinimizeContainer>
        )}

        <CloseContainer>
          <img
            src={CloseReceiverX}
            width={13}
            height={13}
            alt="relay"
            onClick={closeReceiver}
          />
        </CloseContainer>
      </RightIconContainer>
    </Header>
  );
}

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  z-index: 1000;
  text-align: left;
  border-radius: 4px 4px 0 0;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
  color: black;
  display: flex;
  height: 69px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 22px;
`;

const TextContainer = styled.div`
  margin-right: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SoloTextContainer = styled.div`
  margin-right: 35px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 0;
`;

const MainText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 4px;
  color: black;
`;

const SubText = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
`;

const CloseContainer = styled.div`
  cursor: pointer;
`;

const MinimizeContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-end;
`;

const GoBackSvgContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  width: 100%;
  gap: 15px;
  cursor: pointer;
`;

const RightIconContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
`;
