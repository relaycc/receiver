import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  MessageList,
  MessageInput,
  InfoCard,
  LoadingList,
} from '../../Elements';
import {
  isEthAddress,
  useWalletAddress,
  useDmHandle,
  useRelayId,
} from '../../../hooks';
import {
  Conversation,
  useFetchMessages,
  useFetchPeerOnNetwork,
  useMessageStream,
  useSendMessage,
  useXmtpClient,
  useWorkerQueryClient,
} from '@relaycc/xmtp-hooks';
import { Header } from './Header';

export const DirectMessage: FunctionComponent = () => {
  const walletAddress = useWalletAddress();
  const client = useXmtpClient({ clientAddress: walletAddress });
  const clientAddress = client.data?.address();
  const handle = useDmHandle();
  const workerQueryClient = useWorkerQueryClient();
  const sendMessage = useSendMessage({ clientAddress });
  const relayId = useRelayId({
    handle: (() => {
      if (typeof handle === 'string' || handle === null) {
        return handle;
      } else {
        return handle.peerAddress;
      }
    })(),
  });
  const peerAddress = relayId.address.data;
  const conversation: Conversation | null = (() => {
    if (handle === null) {
      return null;
    } else {
      if (isEthAddress(peerAddress)) {
        if (typeof handle === 'string') {
          return {
            peerAddress,
          };
        } else {
          return handle;
        }
      } else {
        return null;
      }
    }
  })();
  useMessageStream({
    clientAddress,
    conversation,
    listener: () => {
      if (conversation !== null) {
        workerQueryClient.refetchQueries({
          queryKey: [
            'messages',
            clientAddress,
            conversation.peerAddress,
            conversation.context?.conversationId,
          ],
        });
      }
    },
  });

  const peerOnNetwork = useFetchPeerOnNetwork({
    peerAddress: relayId.address.data || null,
    clientAddress,
  });

  const messages = useFetchMessages(
    (() => {
      if (conversation === null) {
        return null;
      } else {
        return { conversation, clientAddress };
      }
    })()
  );
  const [scrollMessageList, setScrollMessageList] = useState<() => unknown>(
    () => null
  );

  const sendMessageCb = useCallback(
    (message: string) => {
      if (conversation === null) {
        return null;
      } else {
        return sendMessage.mutate({
          conversation,
          content: message,
        });
      }
    },
    [clientAddress, peerAddress]
  );

  return (
    <>
      <Header clientAddress={clientAddress} conversation={conversation} />
      {(() => {
        if (walletAddress === null) {
          return <InfoCard variant="no wallet" />;
        } else {
          if (client.status === 'loading') {
            if (client.fetchStatus === 'idle') {
              return <InfoCard variant="no xmtp client" />;
            } else {
              return <InfoCard variant="waiting for signature" />;
            }
          } else if (client.status === 'error') {
            return <InfoCard variant="signature denied" />;
          } else if (client.data === null) {
            return <InfoCard variant="no xmtp client" />;
          } else {
            if (conversation === null) {
              if (relayId.address.isLoading) {
                return (
                  <>
                    <LoadingList />
                    <MessageInput
                      onEnterPressed={scrollMessageList}
                      onSendMessage={() => null}
                    />
                  </>
                );
              } else {
                return (
                  <InfoCard
                    variant="invalid handle"
                    handle={(() => {
                      if (typeof handle === 'string' || handle === null) {
                        return handle;
                      } else {
                        return handle.peerAddress;
                      }
                    })()}
                  />
                );
              }
            } else {
              if (messages.isLoading || peerOnNetwork.isLoading) {
                return (
                  <>
                    <LoadingList />
                    <MessageInput
                      onEnterPressed={scrollMessageList}
                      onSendMessage={sendMessageCb}
                    />
                  </>
                );
              } else if (messages.isSuccess) {
                if (peerOnNetwork.data === false) {
                  return <InfoCard variant="no peer" />;
                } else if (messages.data?.length === 0) {
                  return (
                    <>
                      <InfoCard variant="no messages" />
                      <MessageInput
                        onEnterPressed={scrollMessageList}
                        onSendMessage={sendMessageCb}
                      />
                    </>
                  );
                } else {
                  if (!isEthAddress(clientAddress)) {
                    throw new Error(
                      `DirectMessage.tsx :: Client address ${clientAddress} isn't an eth address!`
                    );
                  } else {
                    return (
                      <>
                        <MessageList
                          clientAddress={clientAddress}
                          conversation={conversation}
                          setDoScroll={setScrollMessageList}
                        />
                        <MessageInput
                          onEnterPressed={scrollMessageList}
                          isLoading={sendMessage.isLoading}
                          onSendMessage={sendMessageCb}
                        />
                      </>
                    );
                  }
                }
              } else {
                throw new Error('We shouldnt be able to get to this state!');
              }
            }
          }
        }
      })()}
    </>
  );
};
