import React from 'react';
import { EthAddress } from '@relaycc/xmtp-hooks';
import {
  useSetClosed,
  useGoBack,
  usePinConversation,
  useRelayId,
  Group,
} from '../../../hooks';
import { ExitIcon, MinimizeIcon, GoBackIcon } from '../../Elements';
import { GroupInfo } from './GroupInfo';

export const Header = ({
  handle,
}: {
  clientAddress: EthAddress;
  handle?: string | null;
}) => {
  const relayId = useRelayId({ handle });
  const goBack = useGoBack();
  const setClosed = useSetClosed();
  const pinConversation = usePinConversation();

  const group: Group = {
    name: 'test group',
    wallet: {
      id: 'identity wallet',
      wallet: {
        address: '0x1234567890',
        privateKey: 'NOTREAL',
      },
    },
  };

  return (
    <div className="Header HeaderWrapper">
      <GoBackIcon marginRight="10px" onClick={goBack} />
      <GroupInfo group={group} />
      <MinimizeIcon
        marginLeft="auto"
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
