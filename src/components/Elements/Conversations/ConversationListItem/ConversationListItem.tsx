import React, { FunctionComponent } from 'react';
import { EthAddress } from '../../../../domain';
import { Avatar } from '../../Avatar';
import { getDisplayDate } from '../../../../utils/date';
import { Title } from './Title';
import { motion } from 'framer-motion';

export interface ConversationListItemProps {
  peerAddress: EthAddress;
  peerAddressDisplay?: string;
  subtitle: string;
  topMessageTime: Date;
  onEnsResolve?: (ensName: string | null) => unknown;
  onClick: () => unknown;
}

export const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = ({
  peerAddress,
  peerAddressDisplay,
  subtitle,
  topMessageTime,
  onEnsResolve,
  onClick,
}) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
      key={peerAddress}
      className="ConversationListItem ListItem"
      onClick={onClick}>
      <div style={{ marginRight: '10px' }}>
        <Avatar handle={peerAddress} onClick={() => null} />
      </div>
      <div className="ConversationListItem ContentContainer">
        <div className="ConversationListItem TopLineContainer">
          <Title
            handle={peerAddress}
            override={peerAddressDisplay}
            onNameResolve={onEnsResolve}
          />
          <span className="ConversationListItem Time">
            {getDisplayDate(topMessageTime)}
          </span>
        </div>
        <div className="ConversationListItem Subtitle">{subtitle}</div>
      </div>
    </motion.li>
  );
};
