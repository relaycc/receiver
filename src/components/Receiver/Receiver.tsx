import React, { useState } from 'react';
import styled from 'styled-components';
import { Interpolation } from 'styled-components';
import ChatBox from './ChatBox';
import LaunchButton from './LaunchButton';
import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { XmtpContextProvider } from '../../xmtp-react/context';
import CSS from 'csstype';
import { Signer } from 'ethers';

const alchemyKey = 'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx';

const { chains, provider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyKey }),
  publicProvider(),
])

// Set up connectors
const wagmi = createClient({
  autoConnect: false,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi'
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
  ],
  provider
});

interface ContainerProps {
  buttonText?: string;
  inlineLaunchLogo?: boolean;
  launchButtonStyle?: Interpolation<React.CSSProperties>;
  receiverContainerStyle?: Interpolation<React.CSSProperties>;
  peerAddress?: string;
  signer?: Signer;
}

const Receiver = ({ buttonText = '', inlineLaunchLogo = false, launchButtonStyle, receiverContainerStyle, peerAddress, signer }: ContainerProps) => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);

  const toggle = () => {
    setShowBox(!showBox);
    if (!hasLaunched) setHasLaunched(true);
  };

  if (signer) {

  }

  const chatBoxContainerStyle:CSS.Properties = {
    maxHeight: showBox ? '480px' : (hasLaunched ? '62px' : '0px'),
    height: '480px', 
    position: 'fixed', 
    bottom: '0px', 
    right: '150px',
    transition: 'max-height 0.25s ease-in',
    overflow: 'hidden',
    borderRadius: '8px 8px 0 0'
  }

  return (
    <WagmiConfig client={wagmi}>
      <XmtpContextProvider connectedWallet={signer}>
        <Container>
          <LaunchButton inlineLogo={inlineLaunchLogo} onClick={toggle} text={buttonText} style={launchButtonStyle}></LaunchButton>
          <div style={chatBoxContainerStyle}>
            <ChatBox style={receiverContainerStyle} closeReceiver={toggle} peerAddress={peerAddress} visible={showBox}></ChatBox>
          </div>
        </Container>
      </XmtpContextProvider>
    </WagmiConfig>
  );
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap');
`;

export default Receiver;
