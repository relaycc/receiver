import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Avatar } from '../Avatar';
import { useInView } from '../../../hooks';
import { getDisplayDate } from '../../../utils/date';
import { motion } from 'framer-motion';
import { useRelayId } from '../../../hooks';
import { truncateName } from '../../../utils';
import { truncateLens } from '../../../utils';
import { truncateAddress } from '../../../utils';
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
  const { lens, address, ens } = useRelayId({
    handle: peerAddress,
    wait: isInView === false || typeof peerAddressDisplay === 'string',
  });
  const responsiveEns = truncateName(ens.data);
  const responsiveLens = truncateLens(lens.data);
  const resonsiveAddress = truncateAddress(address.data);

  useEffect(() => {
    if (onEnsResolve === undefined) {
      return;
    } else {
      onEnsResolve(ens.data || null);
    }
  }, [ens.data]);

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
            {(responsiveEns !== 'ENS name or address not found' &&
              responsiveEns) ||
              (responsiveLens !== 'Lens name or address not found' &&
                responsiveLens) ||
              resonsiveAddress ||
              peerAddressDisplay}
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
