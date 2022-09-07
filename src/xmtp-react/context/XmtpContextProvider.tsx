import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
} from 'react';
import { Client, Conversation, Message } from '@xmtp/xmtp-js';
import { Signer } from '@ethersproject/abstract-signer';
import { Status, XmtpContext } from './XmtpContext';
import { initialize } from './initialize';
import { useImmer } from 'use-immer';

export const XmtpContextProvider: FunctionComponent<{
  children: React.ReactNode;
  wallet: Signer | null | undefined;
}> = ({ children, wallet }) => {
  /*
   * Hooks
   */
  const [status, setStatus] = useState<Status>(Status.disconnected);
  const [client, setClient] = useState<Client | null>(null);
  const prevClientAddress = usePreviousString(client?.address);
  const [conversations, setConversations] = useImmer<
    Record<string, Conversation>
  >({});
  const [messages, setMessages] = useImmer<
    Record<string, Record<string, Message>>
  >({});
  const [activity, setActivity] = useImmer<Record<string, Date>>({});

  /*
   * Event Handlers
   */

  const handleWalletDisconnect = useCallback(() => {
    setClient(null);
    setStatus(Status.disconnected);
  }, []);

  const handleNewWalletConnect = useCallback(async () => {
    setClient(null);
    setStatus(Status.idle);
  }, []);

  const handleWalletConnect = useCallback(
    async (wallet: Signer) => {
      const walletIsNew = await (async () => {
        // TODO Sometimes wallet.getAddress fails, not sure why.
        if (wallet.getAddress === undefined) return false;
        const walletAddress = await wallet.getAddress();
        if (prevClientAddress === walletAddress) return false;
        return true;
      })();
      walletIsNew && handleNewWalletConnect();
    },
    [handleNewWalletConnect, prevClientAddress]
  );

  const handleClientWaitingForSignature = useCallback(async () => {
    setStatus(Status.waiting);
  }, []);

  const handleClientConnect = useCallback(async (client: Client) => {
    setClient(client);
    setStatus(Status.loading);
  }, []);

  const handleClientError = useCallback(() => {
    setClient(null);
    setStatus(Status.error);
  }, []);

  const handleConversationsLoaded = useCallback(() => {
    // Do we need to do anything here?
  }, []);

  const handleNewConversation = useCallback(
    (conversation: Conversation) => {
      return setConversations((prev) => {
        prev[conversation.peerAddress] = conversation;
        return prev;
      });
    },
    [setConversations]
  );

  const handleMessagesLoaded = useCallback(() => {
    setStatus(Status.ready);
  }, []);

  const handleNewMessage = useCallback(
    (conversation: Conversation, message: Message) => {
      const { sent } = message;
      const { peerAddress } = conversation;
      if (sent === undefined) {
        return;
      } else {
        // TODO You need to incorporate activity into group messages also.
        setActivity((prev) => {
          if (prev[peerAddress] === undefined) {
            prev[peerAddress] = sent;
          } else {
            if (prev[peerAddress].getTime() < sent.getTime()) {
              prev[peerAddress] = sent;
            }
          }
          return prev;
        });
        return setMessages((prev) => {
          prev[peerAddress] = prev[peerAddress] || {};
          prev[peerAddress][message.id] = message;
          return prev;
        });
      }
    },
    [setMessages, setActivity]
  );

  /*
   * Synchronization
   */

  useEffect(() => {
    if (wallet) {
      handleWalletConnect(wallet);
    } else {
      handleWalletDisconnect();
    }
  }, [wallet, handleWalletConnect, handleWalletDisconnect]);

  /*
   * Actions
   */

  const init = useCallback(async () => {
    if (wallet === null || wallet === undefined) {
      throw new Error('Tried to initialize without a wallet!');
    } else {
      await initialize(
        wallet,
        handleClientWaitingForSignature,
        handleClientConnect,
        handleClientError,
        handleNewConversation,
        handleConversationsLoaded,
        handleNewMessage,
        handleMessagesLoaded
      );
    }
  }, [
    wallet,
    handleClientWaitingForSignature,
    handleClientConnect,
    handleClientError,
    handleNewConversation,
    handleConversationsLoaded,
    handleNewMessage,
    handleMessagesLoaded,
  ]);

  const deinit = useCallback(() => {
    setClient(null);
    setConversations({});
    setMessages({});
    setStatus(Status.idle);
  }, [setConversations, setMessages]);

  /*
   * Strongly Typed Output
   */

  const clientContext = useMemo(() => {
    switch (status) {
      case Status.disconnected:
        return { status };
      case Status.waiting:
        return { status };
      case Status.idle:
        return { status, init };
      case Status.denied:
        return { status, init };
      case Status.error:
        return { status, init };
      case Status.loading:
        return { status, deinit };
      case Status.ready:
        if (client === null) {
          throw new Error('bad state!');
        } else {
          return {
            status,
            conversations,
            messages,
            activity,
            client,
            deinit,
          };
        }
      default:
        throw new Error('bad state!');
    }
  }, [status, init, deinit, client, conversations, messages, activity]);

  return (
    <XmtpContext.Provider value={clientContext}>
      {children}
    </XmtpContext.Provider>
  );
};

function usePreviousString(value: string | undefined) {
  const ref = useRef<string | undefined>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
