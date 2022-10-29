import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Avatar } from '../Avatar';
import {
  useResponsiveName,
  useEnsName,
  useReceiver,
  useInView,
} from '../../../hooks';
import { getDisplayDate } from '../../../utils/date';
import { motion } from 'framer-motion';

export interface ConversationListItemProps {
  peerAddress: string;
  subtitle: string;
  topMessageTime: Date;
  onEnsResolve?: (ensName: string | null) => unknown;
}

export const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = ({ peerAddress, subtitle, topMessageTime, onEnsResolve }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { data: name } = useEnsName({
    handle: peerAddress,
    wait: isInView === false,
  });

  useEffect(() => {
    if (onEnsResolve === undefined) {
      return;
    } else {
      onEnsResolve(name || null);
    }
  }, [name]);

  const responsiveName = useResponsiveName(name, peerAddress, '');

  const goToPeerAddress = useCallback(() => {
    dispatch({
      id: 'go to screen',
      screen: { id: 'messages', handle: peerAddress },
    });
  }, [peerAddress]);

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
      onClick={goToPeerAddress}>
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
