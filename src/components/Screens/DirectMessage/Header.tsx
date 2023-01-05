import React from 'react';
import {
  EthAddress,
  isEthAddress,
  useWriteValue,
  Conversation,
  isSameConversation,
} from '@relaycc/xmtp-hooks';
import {
  ExitIcon,
  GoBackIcon,
  AddressInfo,
  LoadingSpinner,
  PinOffIcon,
  PinIcon,
  MinimizeIcon,
} from '../../Elements';
import {
  useGoBack,
  useSetClosed,
  usePinConversation,
  usePinnedConversations,
} from '../../../hooks';
import { useRelayId } from '../../../hooks';

export const Header = ({
  clientAddress,
  conversation,
}: {
  clientAddress?: EthAddress | null;
  conversation?: Conversation | null;
}) => {
  const goBack = useGoBack();
  const setClosed = useSetClosed();
  const pinConversation = usePinConversation();

  const relayId = useRelayId({ handle: conversation?.peerAddress });
  const pinnedConversations = usePinnedConversations({ clientAddress });
  const pin = useWriteValue({ clientAddress, key: 'pinned-conversations' });

  return (
    <div className="Header HeaderWrapper">
      <GoBackIcon marginRight="10px" onClick={goBack} />
      <AddressInfo handle={conversation?.peerAddress} />
      {(() => {
        if (
          conversation === null ||
          conversation === undefined ||
          (!isEthAddress(relayId.address.data) && !relayId.address.isLoading) ||
          relayId.address.isLoading ||
          pin.isLoading ||
          pinnedConversations.isFetching ||
          pinnedConversations.isLoading
        ) {
          return <LoadingSpinner className="PinnedLoadingSpinner" />;
        } else {
          if (!isEthAddress(relayId.address.data)) {
            throw new Error('relayId.address.data is not an EthAddress');
          }
          if (
            pinnedConversations.data?.find((convo) =>
              isSameConversation(convo, conversation)
            )
          ) {
            return (
              <PinIcon
                marginRight="6px"
                marginLeft="auto"
                onClick={() => {
                  pin.mutate({
                    content: pinnedConversations.data?.filter(
                      (convo) => !isSameConversation(convo, conversation)
                    ),
                  });
                }}
                className="PinIcon"
              />
            );
          } else {
            return (
              <PinOffIcon
                marginRight="6px"
                marginLeft="auto"
                onClick={() => {
                  pin.mutate({
                    content: [
                      ...(pinnedConversations.data || []),
                      conversation,
                    ],
                  });
                }}
                className="PinIcon"
              />
            );
          }
        }
      })()}
      <MinimizeIcon
        onClick={() => {
          if (
            relayId.address.data === undefined ||
            relayId.address.data === null
          ) {
            return;
          } else {
            pinConversation({ peerAddress: relayId.address.data });
            setClosed();
          }
        }}
      />
      <ExitIcon onClick={setClosed} />
    </div>
  );
};
