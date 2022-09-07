import styled, { Interpolation } from 'styled-components';
import { useCallback, useState } from 'react';
import Messages from './Messages';
import { MessageInputFooter } from './Footers/MessageInputFooter';
import Header from './Header';
import {
  useSendMessage,
  Status as SendMessageStatus,
} from '../../xmtp-react/conversations';
import React from 'react';
import { useEnsName } from '../../hooks';
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
  visible,
  peerAddress,
  closeReceiver,
  toggleReceiver,
  setMinimizedConvoList,
}: ChatButtonProps) => {
  const [xmtpReady, setXmptReady] = useState<boolean>(false);
  const [peerIsAvailable, setPeerIsAvailable] = useState<boolean | undefined>();

  const { data: peerName } = useEnsName({
    address: peerAddress,
  });

  const sendMessage = useSendMessage();

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

  const textForHeader = 'Relay Receiver';

  return (
    <ChatContainer>
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

      <RelayRelativeContainer>
        <MessagesContainer>
          <Messages
            peerIsAvailable={peerIsAvailable}
            setPeerIsAvailable={setPeerIsAvailable}
            onXmptReady={handleOnXmtpReady}
            peerName={peerName || peerAddress}
            peerAddress={peerAddress}
          />
        </MessagesContainer>
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
  &&& {
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
  }
`;

const RelayRelativeContainer = styled.div`
  &&& {
    height: 376px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px 0px;
  }
`;

const MessagesContainer = styled.div`
  &&& {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default ChatBox;
