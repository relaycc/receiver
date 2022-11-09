import { FunctionComponent, useMemo } from 'react';
import { MessageBubble } from './MessageBubble';

import { Avatar } from './Avatar';
import { LoadingSpinner } from './LoadingSpinner';
import { Check } from './Icons';
import { Search } from './Icons';
import React from 'react';
import {
  useGroups,
  useGroup,
  useWalletAddress,
  useLensName,
  useEnsName,
} from '../../hooks';
import {
  getDisplayDate,
  MessageBucket,
  TextMessageBucket,
  isTextMessageBucket,
  GroupInviteBucket,
  truncateAddress,
  truncateName,
} from '../../utils';
import { isGroups, isGroup, Message, isGroupInvite } from '../../domain';
import { motion } from 'framer-motion';

export interface MessagesBucketProps {
  bucket: MessageBucket;
}

export const MessagesBucket: FunctionComponent<MessagesBucketProps> = ({
  bucket,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="MessagesBucket Container">
      {(() => {
        if (isTextMessageBucket(bucket)) {
          return <TextBucket bucket={bucket} />;
        } else {
          return <GroupInviteBucket bucket={bucket} />;
        }
      })()}
    </motion.div>
  );
};

const TextBucket: FunctionComponent<{ bucket: TextMessageBucket }> = ({
  bucket,
}) => {
  const lens = useLensName({ handle: bucket.peerAddress });
  const ens = useEnsName({ handle: bucket.peerAddress });

  const primaryId = useMemo(() => {
    if (lens.isLoading) {
      return 'Loading...';
    } else {
      if (lens.data === null || lens.data === undefined) {
        if (ens.isLoading) {
          return 'Loading';
        } else {
          if (ens.data === null || ens.data === undefined) {
            return truncateAddress(bucket.peerAddress);
          } else {
            return truncateName(ens.data);
          }
        }
      } else {
        return truncateName(lens.data);
      }
    }
  }, [lens.isLoading, lens.data, ens.isLoading, ens.data]);

  return (
    <>
      <div className="MessagesBucket SentByInfo">
        <div className="MessagesBucket MessageHeader">
          <div style={{ marginRight: '10px' }}>
            <Avatar handle={bucket.peerAddress} onClick={() => null} />
          </div>
          <div className={`MessagesBucket SenderName black-true white-true`}>
            {primaryId}
          </div>
          <div className="MessagesBucket MessageTime">
            {getDisplayDate(bucket.messages[0].sent)}
          </div>
        </div>
      </div>
      <div className="MessagesBucket FlexColReverseContainer">
        {bucket.messages.map((e: Message) => {
          if (typeof e.content !== 'string') {
            return null;
          } else {
            return (
              <div className="MessagesBucket MessagePosition" key={e.id}>
                <MessageBubble message={e.content} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

const GroupInviteBucket: FunctionComponent<{ bucket: GroupInviteBucket }> = ({
  bucket,
}) => {
  const groupInvite = bucket.message.content;
  if (!isGroupInvite(groupInvite)) {
    throw new Error('Invalid group invite');
  }
  const walletAddress = useWalletAddress();
  const groups = useGroups(walletAddress);
  const group = (() => {
    if (!isGroups(groups.data)) {
      return undefined;
    } else {
      return groups.data.groups[groupInvite.group.wallet.wallet.address];
    }
  })();
  const { join, leave } = useGroup();

  return (
    <div className="GroupInviteBubble">
      <h3 className="GroupInviteBubblePrompt">
        {group === undefined
          ? "You've been invited to join the group"
          : "You've joined the group"}
        <span className="GroupInviteBubbleGroupName">
          {groupInvite.group.name}
        </span>
      </h3>
      <div className="GroupInviteBubbleJoinWrapper">
        <button
          disabled={join.isLoading || leave.isLoading}
          className="GroupInviteBubbleJoin"
          onClick={() => {
            if (!isGroup(group)) {
              join.mutate(groupInvite.group);
            } else {
              leave.mutate(groupInvite.group);
            }
          }}>
          {(() => {
            if (join.isLoading) {
              return 'Joining...';
            } else if (join.isSuccess) {
              return 'Joined Group!';
            } else if (leave.isLoading) {
              return 'Leaving...';
            } else if (leave.isSuccess) {
              return 'Left Group';
            } else if (group === undefined) {
              return 'Join Group';
            } else {
              return 'Leave Group';
            }
          })()}
        </button>
        <div className="GroupInviteBubbleJoinIcon">
          {(() => {
            if (join.isLoading || leave.isLoading) {
              return <LoadingSpinner />;
            } else if (join.isSuccess) {
              return <Check />;
            } else {
              return <Search />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};
