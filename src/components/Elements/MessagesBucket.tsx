import { FunctionComponent } from 'react';
import MessageBubble from './MessageBubble';

import { Avatar } from './Avatar';
import React from 'react';
import { useResponsiveName, useEnsName } from '../../hooks';
import { getDisplayDate } from '../../utils/date';
import { motion } from 'framer-motion';
import { Message } from '@relaycc/xmtp-hooks';

export interface MessagesBucketProps {
  bucket: {
    peerAddress: string;
    messages: Message[];
  };
}

export const MessagesBucket: FunctionComponent<MessagesBucketProps> = ({
  bucket,
}) => {
  const ensName = useEnsName({
    handle: bucket.peerAddress,
  });
  const responsiveName = useResponsiveName(
    ensName.data,
    bucket.peerAddress,
    bucket.peerAddress
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="MessagesBucket Container">
      <div className="MessagesBucket SentByInfo">
        <div className="MessagesBucket MessageHeader">
          <div style={{ marginRight: '10px' }}>
            <Avatar handle={bucket.peerAddress} onClick={() => null} />
          </div>
          <div className={`MessagesBucket SenderName black-true white-true`}>
            {responsiveName}
          </div>
          <div className="MessagesBucket MessageTime">
            {getDisplayDate(bucket.messages[0].sent)}
          </div>
        </div>
      </div>
      <div className="MessagesBucket FlexColReverseContainer">
        {bucket.messages.map((e: Message) => {
          return (
            <div className="MessagesBucket MessagePosition" key={e.id}>
              <MessageBubble message={`${e.content}`} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
