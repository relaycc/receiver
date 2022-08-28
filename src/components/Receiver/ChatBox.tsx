import styled, { Interpolation } from "styled-components";
import { useIsMetaMask } from "../../hooks";
import { useConnect, useAccount } from "wagmi";
import LightCoinbase from "../../assets/images/LightCoinbase.png";
import LightWalletConnect from "../../assets/images/LightWalletConnect.png";
import Metamask from "../../assets/images/Metamask.svg";
import SignInLink from "./Connector";
import { useCallback, useState } from "react";
import Messages from "./Messages";
import Card from "./Card";
import { MessageInputFooter } from "./Footers/MessageInputFooter";

import Header from "./Header";
import Logo from "../../assets/images/logo2.svg";
import {
  useSendMessage,
  Status as SendMessageStatus,
} from "../../xmtp-react/conversations";
import React from "react";
import { useEnsName } from "wagmi";
import { RelayFooter } from "./Footers/RelayFooter";
interface ChatButtonProps {
  visible: boolean;
  as?: string | React.ComponentType<any>;
  style?: Interpolation<React.CSSProperties>;
  peerAddress?: string;
  headerText?: string;
  isUserConnected: boolean;
  toggleReceiver: () => unknown;
  closeReceiver: () => unknown;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setMinimizedConvoList: any;
  minimizedConvoList: any;
}

const ChatBox = ({
  setShowConversations,
  style,
  isUserConnected,
  visible,
  as,
  peerAddress,
  headerText,
  closeReceiver,
  toggleReceiver,
  setMinimizedConvoList,
  minimizedConvoList,
}: ChatButtonProps) => {
  const isMetaMask = useIsMetaMask();
  const [xmtpReady, setXmptReady] = useState<boolean>(false);
  const [userDidConnect, setUserDidConnect] = useState<boolean>(false);
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const [peerIsAvailable, setPeerIsAvailable] = useState<boolean | undefined>();

  const { data: peerName } = useEnsName({
    address: peerAddress,
  });

  const sendMessage = useSendMessage();

  const metamaskConnector = connectors.find(
    (connector) => connector.id === "injected"
  );

  const walletConnectConnector = connectors.find(
    (connector) => connector.id === "walletConnect"
  );

  const coinbaseConnector = connectors.find(
    (connector) => connector.id === "coinbaseWallet"
  );

  // TODO prevent connection if already connected.
  const handleClickMetamask = useCallback(() => {
    setUserDidConnect(true);
    connect({ connector: metamaskConnector });

    /* eslint-disable-next-line */
  }, []);

  const handleClickCoinbase = useCallback(() => {
    setUserDidConnect(true);
    connect({ connector: coinbaseConnector });
    /* eslint-disable-next-line */
  }, []);

  const handleClickWalletConnect = useCallback(() => {
    setUserDidConnect(true);
    connect({ connector: walletConnectConnector });
    /* eslint-disable-next-line */
  }, []);

  const handleOnXmtpReady = useCallback((isReady: boolean) => {
    setXmptReady(isReady);
  }, []);

  const doSendMessage = useCallback(
    async (message: string) => {
      if (peerAddress && sendMessage.status === SendMessageStatus.ready) {
        sendMessage.send(peerAddress, message);
      }
    },
    [sendMessage, peerAddress]
  );

  const textForHeader =
    isUserConnected || (isConnected && userDidConnect)
      ? null
      : "Relay Receiver";

  return (
    <ChatContainer visible={visible} as={as} style={style}>
      <Header
        peerIsAvailable={peerIsAvailable}
        setMinimizedConvoList={setMinimizedConvoList}
        minimizedConvoList={minimizedConvoList}
        setShowConversations={setShowConversations}
        visible={visible}
        peerName={peerName}
        peerAddress={peerAddress}
        text={textForHeader}
        closeReceiver={closeReceiver}
        toggleReceiver={toggleReceiver}
      />
      <RelayRelativeContainer>
        {isUserConnected || (isConnected && userDidConnect) ? (
          <MessagesContainer>
            <Messages
              peerIsAvailable={peerIsAvailable}
              setPeerIsAvailable={setPeerIsAvailable}
              onXmptReady={handleOnXmtpReady}
              peerName={peerName || peerAddress}
              peerAddress={peerAddress}
            />
          </MessagesContainer>
        ) : (
          <Card title="Connect your wallet to start a converation!">
            <ConnectorList>
              {isMetaMask && (
                <Connector onClick={handleClickMetamask}>
                  <SignInLink
                    hoverLogo={Metamask}
                    name={"Metamask"}
                    onClick={handleClickMetamask}
                  />
                </Connector>
              )}
              <MaybeHideOnConnector
                onClick={handleClickWalletConnect}
                shouldHide={isMetaMask}
              >
                <SignInLink
                  hoverLogo={LightWalletConnect}
                  name={"Wallet Connect"}
                  onClick={handleClickWalletConnect}
                />
              </MaybeHideOnConnector>
              <MaybeHideOnConnector
                onClick={handleClickCoinbase}
                shouldHide={isMetaMask}
              >
                <SignInLink
                  hoverLogo={LightCoinbase}
                  name={"Coinbase"}
                  onClick={handleClickCoinbase}
                />
              </MaybeHideOnConnector>
            </ConnectorList>
          </Card>
        )}
      </RelayRelativeContainer>
      {!xmtpReady ? (
        <RelayFooter />
      ) : (
        <MessageInputFooter onSendMessage={doSendMessage} />
      )}
    </ChatContainer>
  );
};


const ChatContainer = styled.div<ChatButtonProps>`
  background-color: transparent;
  color: white;
  border: none;
  padding: 0px;
  font-size: 16px;
  height: 100%;
  z-index: 1000;
  width: 375px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0 0;
  ${({ style }) => style};
  position: relative;
`;

const RelayRelativeContainer = styled.div`
  height: 376px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 0px;
`;

const ConnectorList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Connector = styled.div`
  color: #333333;
  list-style-type: none;
  cursor: pointer;
  width: 206px;
  height: 58px;
  border-radius: 5px;
  background: #fbfaff;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: "poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const MaybeHideOnConnector = styled(Connector)<{ shouldHide: boolean }>`
  @media (pointer: coarse) {
    display: ${(p) => (p.shouldHide ? "none" : "flex")};
  }
`;

const MessagesContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default ChatBox;
