import styled, { Interpolation } from 'styled-components';
import { useIsMetaMask } from '../../hooks';
import { useConnect } from 'wagmi';
import LightCoinbase from '../../../public/assets/images/LightCoinbase.png';
import LightWalletConnect from '../../../public/assets/images/LightWalletConnect.png';
import Metamask from '../../../public/assets/images/Metamask.svg';
import SignInLink from './Connector';
import { useCallback, useState } from 'react';
import Avatar from './Avatar';
import Messages from './Messages';
import Header from './Header';
import Logo from '../../../public/assets/images/logo.svg';
import {
  useSendMessage,
  Status as SendMessageStatus,
} from '../../xmtp-react/conversations';

interface ChatButtonProps {
  visible: boolean;
  as?: string | React.ComponentType<any>;
  style?: Interpolation<React.CSSProperties>;
  peerAddress?: string;
  headerText?: string;
  onCloseReceiver: () => unknown;
}

const ChatBox = ({ style, visible, as, peerAddress, headerText, onCloseReceiver}: ChatButtonProps) => {
  const isMetaMask = useIsMetaMask();
  const [xmtpReady, setXmptReady] = useState<boolean>(false);
  const [userDidConnect, setUserDidConnect] = useState<boolean>(false);
  const { connect, connectors, isConnected } = useConnect();
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
    connect(metamaskConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleClickCoinbase = useCallback(() => {
    setUserDidConnect(true);
    connect(coinbaseConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleClickWalletConnect = useCallback(() => {
    setUserDidConnect(true);
    connect(walletConnectConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleOnXmtpReady = useCallback(() => {
    setXmptReady(true);
  }, []);

  const doSendMessage = useCallback(
    async (message: string) => {
      if (peerAddress && sendMessage.status === SendMessageStatus.ready) {
        sendMessage.send(peerAddress, message);
      }
    },
    [sendMessage, peerAddress]
  );


  return (
    <ChatContainer visible={visible} as={as} style={style} onCloseReceiver={onCloseReceiver}>
      <RelayRelativeContainer>
        {(isConnected && userDidConnect) ? (
          <>
            <Header text={peerAddress} showLinks={true} onCloseReceiver={onCloseReceiver} />
            <Messages onXmptReady={handleOnXmtpReady} providedPeerAddress={peerAddress} />
          </>
        ) : (
          <>
            <Header text={headerText} showLinks={false} />
            <ConnectorList>
              <ConnectorPrompt>Connect your wallet to start a converation!</ConnectorPrompt>
              {isMetaMask && (
                <Connector onClick={handleClickMetamask}>
                  <SignInLink
                    hoverLogo={Metamask.src}
                    name={'Metamask'}
                    onClick={handleClickMetamask}
                  />
                </Connector>
              )}
              <MaybeHideOnConnector onClick={handleClickWalletConnect} shouldHide={isMetaMask}>
                <SignInLink
                  hoverLogo={LightWalletConnect.src}
                  name={'Wallet Connect'}
                  onClick={handleClickWalletConnect}
                />
              </MaybeHideOnConnector>
              <MaybeHideOnConnector onClick={handleClickCoinbase} shouldHide={isMetaMask}>
                <SignInLink
                  hoverLogo={LightCoinbase.src}
                  name={'Coinbase'}
                  onClick={handleClickCoinbase}
                />
              </MaybeHideOnConnector>
            </ConnectorList>
            <AvatarContainer>
              <Avatar address={peerAddress} />
            </AvatarContainer>
          </>
        )}
        { xmtpReady ? (
          <></>
        ) : 
          <RelayFooter>Powered by Relay</RelayFooter>
        }
      </RelayRelativeContainer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div<ChatButtonProps>`
  ${({ style }) => style };
  max-height: ${({ visible }) => visible ? '480px' : '0px' };
  overflow: scroll;
  background-color: white;
  color: white;
  border: none;
  transition: max-height 0.25s ease-out;
  padding: 0px;
  font-size: 16px;
  letter-spacing: .1em;
  position: fixed;
  bottom: 100px;
  right: 30px;
  height: 480px;
  width: 375px;
  border-radius: 7px;
`;

const RelayRelativeContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const RelayFooter = styled.div`
  position: absolute;
  bottom: 0;
  color: #333333;
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  height: 50px;
  width: 100%;
  background-color: white;
  padding: 14px 0px;
  box-shadow: 0px -4px 3px rgba(70, 96, 135, 0.1);

  &:after {
    background-image: url(${Logo.src});
    height: 15px;
    width: 15px;
    content: '';
    display: inline-block;
    vertical-align: sub;
    margin-left: 5px;
  }
`;

const ConnectorPrompt = styled.div`
  color: #333333;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

const ConnectorList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 10px;
  gap: 10px;
  position: absolute;
  width: 227px;
  height: 263px;
  left: 80px;
  bottom: 73px;
  background: #F7F7F7;
  border-radius: 8px 8px 8px 0px;
`;

const Connector = styled.li`
  color: #333333;
  list-style-type: none;
  cursor: pointer;
  width: 206px;
  height: 58px;
  border-radius: 5px;
  background: white;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 25px;
  bottom: 73px;
`

const MaybeHideOnConnector = styled(Connector)<{ shouldHide: boolean }>`
  @media (pointer: coarse) {
    display: ${(p) => (p.shouldHide ? 'none' : 'flex')};
  }
`;

export default ChatBox;
