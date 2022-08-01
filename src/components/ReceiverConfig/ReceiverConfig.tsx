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
import ChatBox from '../Receiver/ChatBox';
import CSS from 'csstype';
import { Interpolation } from 'styled-components';

export const ReceiverContext = React.createContext({
  setPeerAddress: (item: string) => {},
  toggle: () => {},
});

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

const ReceiverConfig = ({ signer, children, receiverContainerStyle }: ConfigProps) => {

  const [showBox, setShowBox] = useState<boolean>(false);
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);
  const [peerAddress, setPeerAddress] = useState<string>('');

  const onPeerAddressChange = (address: string) => {
    setPeerAddress(address);
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
      <XmtpContextProvider connectedWallet={signer}>
        <ReceiverContext.Provider value={{ setPeerAddress: setPeerAddress, toggle: toggle }}>
          <div style={chatBoxContainerStyle}>
            <ChatBox isUserConnected={signer != undefined} style={receiverContainerStyle} toggleReceiver={toggle} peerAddress={peerAddress} visible={showBox}></ChatBox>
          </div>
          { children }
        </ReceiverContext.Provider>
      </XmtpContextProvider>
    </WagmiConfig>
  );
};

export default ReceiverConfig;
