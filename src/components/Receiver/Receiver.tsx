import React, { useState } from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { XmtpContextProvider } from "../../xmtp-react/context";
import { Signer } from "ethers";
import ChatBox from "./ChatBox";
import CSS from "csstype";
import { Interpolation, ThemeProvider } from "styled-components";
import ReceiverContext from "./ReceiverContext";
import styled from "styled-components";
import { getAddress } from "@ethersproject/address";
import { GlobalStyles } from "../../styles/global";
import { ConversationsList } from "./Conversations/ConversationsList";
import Avatar from "./Avatar";

const alchemyKey = "kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx";

const { chains, provider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyKey }),
  publicProvider(),
]);

// Set up connectors
const wagmi = createClient({
  autoConnect: false,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
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
  provider,
});

interface ConfigProps {
  children: React.ReactNode;
  signer?: Signer;
  receiverContainerStyle?: Interpolation<React.CSSProperties>;
}

const Receiver = ({
  signer,
  children,
  receiverContainerStyle,
}: ConfigProps) => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [hasLaunched, setHasLaunched] = useState<boolean>(false);
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [showConversations, setShowConversations] = useState(false);
  const [minimizedConvoList, setMinimizeConvoList] = useState([]);

  const convertAndSetPeerAddress = (peerAddress: string) => {
    const cleanAddress = getAddress(peerAddress);
    setPeerAddress(cleanAddress);
  };

  const toggle = () => {
    setShowBox(!showBox);
    if (!hasLaunched) setHasLaunched(true);
  };

  const close = () => {
    setShowBox(false);
    setHasLaunched(false);
  };

  const removeFromList = (e: any) => {
    setMinimizeConvoList((items) => items.filter((_, i) => i !== e));
  };


  const chatBoxContainerStyle: CSS.Properties = {
    maxHeight: showBox ? "500px" : hasLaunched ? "0px" : "0px",
    height: "500px",
    position: "fixed",
    bottom: "0px",
    right: "150px",
    transition: "max-height 0.25s ease-in",
    zIndex: 1000,
  };

  return (
    <WagmiConfig client={wagmi}>
      <XmtpContextProvider connectedWallet={signer} peerAddress={peerAddress}>
        <ReceiverContext.Provider
          value={{
            setPeerAddress: convertAndSetPeerAddress,
            close: close,
            toggle: toggle,
          }}
        >
          <Container>
            <div style={chatBoxContainerStyle}>
              <GlobalStyles />
              <ConversationsList
                setPeerAddress={setPeerAddress}
                setShowConversations={setShowConversations}
                showConversations={showConversations}
              />
              <ChatBox
                minimizedConvoList={minimizedConvoList}
                setMinimizedConvoList={setMinimizeConvoList}
                setShowConversations={setShowConversations}
                isUserConnected={signer != undefined}
                style={receiverContainerStyle}
                closeReceiver={close}
                toggleReceiver={toggle}
                peerAddress={peerAddress}
                visible={showBox}
              ></ChatBox>
              <MinimizedIconList>
                {minimizedConvoList.map((e, index) => (
                  <AvatarContainer key={e}>
                    <Avatar
                      setPeerAddress={setPeerAddress}
                      setShowBox={setShowBox}
                      address={e}
                    />
                    <AvatarHoverDetails onClick={() => removeFromList(index)}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.99974 5.58599L11.9497 0.635986L13.3637 2.04999L8.41374 6.99999L13.3637 11.95L11.9497 13.364L6.99974 8.41399L2.04974 13.364L0.635742 11.95L5.58574 6.99999L0.635742 2.04999L2.04974 0.635986L6.99974 5.58599Z"
                          fill="black"
                        />
                      </svg>
                    </AvatarHoverDetails>
                  </AvatarContainer>
                ))}
              </MinimizedIconList>
            </div>
          </Container>
          {children}
        </ReceiverContext.Provider>
      </XmtpContextProvider>
    </WagmiConfig>
  );
};
const MinimizedIconList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 123px;
  right: 45px;
  gap: 10px;
`;

const AvatarHoverDetails = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  display: none;
  z-index: 100000;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  :hover ${AvatarHoverDetails} {
    display: block;
  }
`;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600&family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,400&family=Roboto:wght@100;300;500;700&display=swap");
`;

export default Receiver;
