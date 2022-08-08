import React, { useEffect, useState } from 'react';
import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
  useSigner,
  useConnect,
  useEnsName,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { XmtpContextProvider } from '../../store/xmtp-react/context';
import { Signer } from 'ethers';
import ChatBox from './ChatBox';
import CSS from 'csstype';
import { Interpolation } from 'styled-components';
import ReceiverContext from './ReceiverContext';
import styled from 'styled-components';
import { receiverStore } from '../../store';

interface ConfigProps {
  children: React.ReactNode;
  signer?: Signer;
  receiverContainerStyle?: Interpolation<React.CSSProperties>;
}

const Receiver = ({ signer, children, receiverContainerStyle }: ConfigProps) => {
  const { setPeerName, peerAddress } = receiverStore();
  const { data: wagmiSigner } = useSigner();
  const wallet = signer ? signer : wagmiSigner;
  const { connect, connectors } = useConnect();

  if (peerAddress) {
    //const { data: peerName } = useEnsName({address: peerAddress})
    //peerName && setPeerName(peerName);
  } 

  const [showBox, setShowBox] = useState<boolean>(false);
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);

  const toggle = () => {
    setShowBox(!showBox);
    if (!hasLaunched) setHasLaunched(true);
  };

  const metamaskConnector = connectors.find(
    (connector) => connector.id === 'injected'
  );

   // TODO prevent connection if already connected.
   const handleClickMetamask = () => {
    //setUserDidConnect(true);
    connect({connector: metamaskConnector});

    /* eslint-disable-next-line */
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
    <ReceiverContext.Provider value={{ toggle: toggle }}>
      <Container>
        <div style={chatBoxContainerStyle}>
          <ChatBox handleClickMetamask={handleClickMetamask} isUserConnected={signer != undefined} style={receiverContainerStyle} toggleReceiver={toggle} visible={showBox}></ChatBox>
        </div>
      </Container>
      { children }
    </ReceiverContext.Provider>
  );
};


const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap');
`;


export default Receiver;
