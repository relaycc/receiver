import React, { useState } from 'react';
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
import { Signer } from 'ethers';
import ChatBox from './ChatBox';
import CSS from 'csstype';
import { Interpolation } from 'styled-components';
import ReceiverContext from './ReceiverContext';
import styled from 'styled-components';
import { getAddress } from '@ethersproject/address'

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

interface ConfigProps {
  children: React.ReactNode;
  signer?: Signer;
  receiverContainerStyle?: Interpolation<React.CSSProperties>;
}

const Receiver = ({ signer, children, receiverContainerStyle }: ConfigProps) => {

  const [showBox, setShowBox] = useState<boolean>(false);
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);
  const [peerAddress, setPeerAddress] = useState<string>('');

  const convertAndSetPeerAddress = (peerAddress: string) => {
    const cleanAddress = getAddress(peerAddress);
    setPeerAddress(cleanAddress);
  }

  const toggle = () => {
    setShowBox(!showBox);
    if (!hasLaunched) setHasLaunched(true);
  };

  const chatBoxContainerStyle:CSS.Properties = {
    maxHeight: showBox ? '480px' : (hasLaunched ? '62px' : '0px'),
    height: '480px', 
    position: 'fixed', 
    bottom: '0px', 
    right: '150px',
    transition: 'max-height 0.25s ease-in',
    zIndex: 1000
  }

  return (
    <WagmiConfig client={wagmi}>
      <XmtpContextProvider connectedWallet={signer} peerAddress={peerAddress}>
        <ReceiverContext.Provider value={{ setPeerAddress: convertAndSetPeerAddress, toggle: toggle }}>
          <Container>
            <div style={chatBoxContainerStyle}>
              <ChatBox isUserConnected={signer != undefined} style={receiverContainerStyle} toggleReceiver={toggle} peerAddress={peerAddress} visible={showBox}></ChatBox>
            </div>
          </Container>
          { children }
        </ReceiverContext.Provider>
      </XmtpContextProvider>
    </WagmiConfig>
  );
};


const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap');
`;


export default Receiver;
