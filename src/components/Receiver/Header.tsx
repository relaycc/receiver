import styled from "styled-components";
import { truncateAddress } from "../../utls/address";
import React from "react";
import { FetchEnsNameResult } from "@wagmi/core";
import Avatar from "./Avatar";

interface HeaderProps {
  text: string | null;
  visible: boolean;
  peerAddress: string | undefined;
  peerName: FetchEnsNameResult | undefined;
  toggleReceiver: () => unknown;
  closeReceiver: () => unknown;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setMinimizedConvoList: any;
  minimizedConvoList: any;
  peerIsAvailable: boolean | undefined;
}

export default function RelayHeader({
  text = "Relay Receiver",
  visible,
  peerAddress,
  peerName,
  toggleReceiver,
  closeReceiver,
  setShowConversations,
  setMinimizedConvoList,
  minimizedConvoList,
  peerIsAvailable,
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

  const handleGoBackClick = () => {
    setShowConversations(true);
  };

  const handleMinimizeClick = () => {
    toggleReceiver();
    setMinimizedConvoList((list: any) => {
      if (peerAddress === null || peerIsAvailable === false) {
        return [...list];
      }
      if (list.indexOf(peerAddress) === -1) {
        return [...list, peerAddress];
      } else {
        return [...list];
      }
    });
  };

  return (
    <Header>
      <GoBackSvgContainer>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="black"
          height="24"
          width="24"
          onClick={handleGoBackClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
        <HeaderInfo>
          <Avatar address={peerAddress} />
          {headerText()}
        </HeaderInfo>
      </GoBackSvgContainer>
      <RightIconContainer>
        <MinimizeSvg
          onClick={handleMinimizeClick}
          fill="none"
          viewBox="0 0 28 28"
          strokeWidth={2.5}
          stroke="black"
          height="28"
          width={28}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </MinimizeSvg>

        <svg
          onClick={closeReceiver}
          fill="none"
          viewBox="0 0 28 28"
          strokeWidth={2.5}
          stroke="black"
          height="28"
          width="28"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </RightIconContainer>
    </Header>
  );
}

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  text-align: left;
  border-radius: 4px 4px 0 0;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
  color: black;
  display: flex;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  z-index: 1011;
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
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 0;
`;

const MainText = styled.div`
  font-weight: 600;
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

const GoBackSvgContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  width: 100%;
`;

const RightIconContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 5px;
`;

const MinimizeSvg = styled.svg`
  transform: translateY(6px);
`;
const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
