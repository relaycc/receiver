import React, { FunctionComponent } from 'react';
import { Avatar } from './Avatar';
import { useResponsiveName, useEnsName } from '../../hooks';
import { useReceiver } from '../../hooks';
import { getDisplayDate } from '../../utils/date';
import { motion } from 'framer-motion';

export interface ConversationListItemProps {
  peerAddress: string;
  subtitle: string;
  topMessageTime: Date;
  order: number;
}

export const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = ({ peerAddress, subtitle, topMessageTime, order }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const { name } = useEnsName({
    handle: peerAddress,
  });
  const responsiveName = useResponsiveName(name, peerAddress, '');

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: order * 0.2 }}
      className="ConversationListItem ListItem"
      onClick={() =>
        dispatch({
          id: 'go to screen',
          screen: { id: 'messages', peerAddress },
        })
      }>
      <div style={{ marginRight: '10px' }}>
        <Avatar handle={peerAddress} onClick={() => null} />
      </div>
      <div className="ConversationListItem ContentContainer">
        <div className="ConversationListItem TopLineContainer">
          <span className="ConversationListItem Title">{responsiveName}</span>
          <span className="ConversationListItem Time">
            {getDisplayDate(topMessageTime)}
          </span>
        </div>
        <div className="ConversationListItem Subtitle">{subtitle}</div>
      </div>
    </motion.li>
  );
};
