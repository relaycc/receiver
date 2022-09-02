import styled, { Interpolation } from 'styled-components';
import { useIsMetaMask } from '../../hooks';
import { useConnect, useAccount } from 'wagmi';
import SignInLink from './Connector';
import { useCallback, useState } from 'react';
import Messages from './Messages';
import Card from './Card';
import { MessageInputFooter } from './Footers/MessageInputFooter';
import Header from './Header';
import {
  useSendMessage,
  Status as SendMessageStatus,
} from '../../xmtp-react/conversations';
import React from 'react';
import { useEnsName } from 'wagmi';
import { RelayFooter } from './Footers/RelayFooter';

type MinimizedConvoListSetter = (list: string[]) => string[];

interface ChatButtonProps {
  visible: boolean;
  style?: Interpolation<React.CSSProperties>;
  peerAddress?: string;
  headerText?: string;
  isUserConnected: boolean;
  toggleReceiver: () => unknown;
  closeReceiver: () => unknown;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setMinimizedConvoList: (setter: MinimizedConvoListSetter) => unknown;
}

const ChatBox = ({
  setShowConversations,
  isUserConnected,
  visible,
  peerAddress,
  closeReceiver,
  toggleReceiver,
  setMinimizedConvoList,
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
    (connector) => connector.id === 'injected'
  );

  const walletConnectConnector = connectors.find(
    (connector) => connector.id === 'walletConnect'
  );

  const coinbaseConnector = connectors.find(
    (connector) => connector.id === 'coinbaseWallet'
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
      : 'Relay Receiver';

  const test = () => {
    console.log(peerIsAvailable);
  };
  return (
    <ChatContainer>
      {isConnected && userDidConnect ? (
        <Header
          peerIsAvailable={peerIsAvailable}
          setMinimizedConvoList={setMinimizedConvoList}
          setShowConversations={setShowConversations}
          visible={visible}
          peerName={peerName}
          peerAddress={peerAddress}
          text={textForHeader}
          closeReceiver={closeReceiver}
          toggleReceiver={toggleReceiver}
        />
      ) : (
        <UnConnectedHeader onClick={test}>
          <LeftContainer>
            <HeaderLogo>
              <img
                src={
                  'https://relay-receiver-prod.s3.amazonaws.com/smallLogo.png'
                }
                alt="RelayReceiver"></img>
            </HeaderLogo>
            <CompanyName>Relay Receiver</CompanyName>
          </LeftContainer>
          <ExitSvg
            onClick={closeReceiver}
            fill="none"
            viewBox="0 0 28 28"
            strokeWidth={2.5}
            stroke="black"
            height="28"
            width="28">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </ExitSvg>
        </UnConnectedHeader>
      )}

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
                    hoverLogo={
                      'https://relay-receiver-prod.s3.amazonaws.com/Metamask.svg'
                    }
                    name={'Metamask'}
                    onClick={handleClickMetamask}
                  />
                </Connector>
              )}
              <MaybeHideOnConnector
                onClick={handleClickWalletConnect}
                shouldHide={isMetaMask}>
                <SignInLink
                  hoverLogo={
                    'https://relay-receiver-prod.s3.amazonaws.com/LightWalletConnect.png'
                  }
                  name={'Wallet Connect'}
                  onClick={handleClickWalletConnect}
                />
              </MaybeHideOnConnector>
              <MaybeHideOnConnector
                onClick={handleClickCoinbase}
                shouldHide={isMetaMask}>
                <SignInLink
                  hoverLogo={
                    'https://relay-receiver-prod.s3.amazonaws.com/LightCoinbase.png'
                  }
                  name={'Coinbase'}
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

const ChatContainer = styled.div`
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  background-color: white;
  border: none;
  padding: 0px;
  font-size: 16px;
  height: 100%;
  z-index: 1000;
  width: 375px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0 0;
  position: relative;
`;

const RelayRelativeContainer = styled.div`
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  height: 376px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 0px;
`;

const ConnectorList = styled.div`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Connector = styled.div`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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
  font-family: 'poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const MaybeHideOnConnector = styled(Connector)<{ shouldHide: boolean }>`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  @media (pointer: coarse) {
    display: ${(p) => (p.shouldHide ? 'none' : 'flex')};
  }
`;

const MessagesContainer = styled.div`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 7px;
  margin-left: 10px;
`;

const UnConnectedHeader = styled.div`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: black;
  border-radius: 4px 4px 0 0;
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  background-color: white;
`;

const CompanyName = styled.h1`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`;

const HeaderLogo = styled.div`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  width: 29px;
  > img {
    height: 27px;
    width: 29px;
  }
`;

const ExitSvg = styled.svg`
  letter-spacing: normal;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
`;

export default ChatBox;
