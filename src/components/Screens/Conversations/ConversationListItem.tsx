import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Avatar } from '../../Elements/Avatar';
import { useResponsiveName, useEnsName, useInView } from '../../../hooks';
import { getDisplayDate } from '../../../utils/date';
import { motion } from 'framer-motion';

export interface ConversationListItemProps {
  peerAddress: string;
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
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { data: name } = useEnsName({
    handle: peerAddress,
    wait: isInView === false || typeof peerAddressDisplay === 'string',
  });

  useEffect(() => {
    if (onEnsResolve === undefined) {
      return;
    } else {
      onEnsResolve(name || null);
    }
  }, [name]);

  const responsiveName = useResponsiveName(name, peerAddress, '');

  return (
    <motion.li
      ref={ref}
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
          <span className="ConversationListItem Title">
            {peerAddressDisplay || responsiveName}
          </span>
          <span className="ConversationListItem Time">
            {getDisplayDate(topMessageTime)}
          </span>
        </div>
        <div className="ConversationListItem Subtitle">{subtitle}</div>
      </div>
    </motion.li>
  );
};
