import React, { FunctionComponent, useState, useCallback } from 'react';
import { Screen } from './Screen';
import {
  MessageList,
  MessageInput,
  InfoCard,
  LoadingList,
  RelayIdInput,
  Plus,
} from '../Elements';
import {
  useMessages,
  useConfig,
  useClient,
  useWalletAddress,
  useGroup,
  useGroups,
} from '../../hooks';
import {
  EthAddress,
  sendGroupMessage,
  isGroup,
  Handle,
  isEthAddress,
} from '../../domain';

export interface GroupProps {
  peerAddress: EthAddress;
}

export const Group: FunctionComponent<GroupProps> = ({ peerAddress }) => {
  const walletAddress = useWalletAddress();
  const groupClient = useClient(peerAddress);
  const messages = useMessages({
    clientAddress: peerAddress,
    peerAddress,
  });
  const [scrollMessageList, setScrollMessageList] = useState<() => unknown>(
    () => null
  );
  const config = useConfig();
  const { invite } = useGroup();
  const groups = useGroups(walletAddress);
  const group = (() => {
    if (groups.data === undefined) {
      return undefined;
    } else {
      return groups.data.groups[peerAddress];
    }
  })();

  const sendMessage = useCallback(
    (message: string) => {
      if (config === null || !isGroup(group)) {
        return;
      } else {
        return sendGroupMessage(peerAddress, config.xmtp.client, {
          senderAddress: group.wallet.wallet.address,
          message,
        });
      }
    },
    [config, peerAddress]
  );

  const onSubmitInvite = useCallback((peerAddress: Handle) => {
    if (group === undefined || !isEthAddress(peerAddress)) {
      return;
    } else {
      invite.mutate({ peerAddress: peerAddress, group });
    }
  }, []);

  return (
    <Screen
      content={(() => {
        if (messages.isLoading || groupClient.isLoading) {
          return (
            <>
              <LoadingList />
              <MessageInput
                onEnterPressed={scrollMessageList}
                onSendMessage={() => null}
              />
            </>
          );
        } else if (messages.isSuccess) {
          if (messages.data.messages.length === 0) {
            return (
              <>
                <InfoCard variant="no messages" />
                <MessageInput
                  onEnterPressed={scrollMessageList}
                  onSendMessage={sendMessage}
                />
              </>
            );
          } else {
            return (
              <>
                <RelayIdInput
                  className="rr-m-10px-mt-4"
                  HintIcon={Plus}
                  onSubmit={onSubmitInvite}
                />
                <MessageList
                  clientAddress={peerAddress}
                  peerAddress={peerAddress}
                  setDoScroll={setScrollMessageList}
                />
                <MessageInput
                  onEnterPressed={scrollMessageList}
                  onSendMessage={sendMessage}
                />
              </>
            );
          }
        } else {
          throw new Error('We shouldnt be able to get to this state!');
        }
      })()}
    />
  );
};
