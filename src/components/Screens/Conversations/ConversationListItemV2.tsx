import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Avatar } from '../../Elements/Avatar';
import { useResponsiveName, useEnsName, useInView } from '../../../hooks';
import { getDisplayDate } from '../../../utils/date';
import { motion } from 'framer-motion';
import {
  Conversation,
  EthAddress,
  isMessage,
  useFetchMessages,
} from '@relaycc/xmtp-hooks';
import { LoadingText } from '../../Elements/LoadingText';

export interface ConversationListItemV2Props {
  peerAddressDisplay?: string;
  conversation: Conversation;
  clientAddress?: EthAddress | null;
  onEnsResolve?: (ensName: string | null) => unknown;
  onClick: () => unknown;
}

export const ConversationListItemV2: FunctionComponent<
  ConversationListItemV2Props
> = ({
  clientAddress,
  conversation,
  peerAddressDisplay,
  onEnsResolve,
  onClick,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { data: name } = useEnsName({
    handle: conversation.peerAddress,
    wait: isInView === false || typeof peerAddressDisplay === 'string',
  });
  const messages = useFetchMessages({ conversation, clientAddress });

  useEffect(() => {
    if (onEnsResolve === undefined) {
      return;
    } else {
      onEnsResolve(name || null);
    }
  }, [name]);

  const responsiveName = useResponsiveName(name, conversation.peerAddress, '');

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
      key={conversation.peerAddress}
      className="ConversationListItem ListItem"
      onClick={onClick}>
      <div style={{ marginRight: '10px' }}>
        <Avatar handle={conversation.peerAddress} onClick={() => null} />
      </div>
      <div className="ConversationListItem ContentContainer">
        <div className="ConversationListItem TopLineContainer">
          <span className="ConversationListItem Title">
            {peerAddressDisplay || responsiveName}
            {(() => {
              if (typeof conversation.context?.conversationId === 'string') {
                if (
                  conversation.context.conversationId.startsWith('lens.dev')
                ) {
                  return ' 🌿';
                } else {
                  return '';
                }
              } else {
                return '';
              }
            })()}
          </span>
          <span className="ConversationListItem Time">
            {(() => {
              const lastMessage = messages.data?.[0];
              if (!isMessage(lastMessage)) {
                return <LoadingText />;
              } else {
                return getDisplayDate(lastMessage.sent);
              }
            })()}
          </span>
        </div>
        <div className="ConversationListItem Subtitle">
          {(() => {
            const lastMessage = messages.data?.[0];
            if (!isMessage(lastMessage)) {
              return <LoadingText />;
            } else {
              return `${lastMessage.content}`;
            }
          })()}
        </div>
      </div>
    </motion.li>
  );
};
