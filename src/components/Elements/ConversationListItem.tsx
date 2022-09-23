import React, { FunctionComponent } from 'react';
import { Avatar } from './Avatar';
import { useResponsiveName, useEnsName } from '../../hooks';
import { useReceiver } from '../../hooks';
import { setConversationTime } from '../../utils/date';

export interface ConversationListItemProps {
  peerAddress: string;
  subtitle: string;
  topMessageTime: Date;
}

export const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = ({ peerAddress, subtitle, topMessageTime }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const { name } = useEnsName({
    handle: peerAddress,
  });
  const responsiveName = useResponsiveName(name, peerAddress, '');

  return (
    <li
      className="ConversationListItem ListItem"
      onClick={() =>
        dispatch({
          id: 'go to screen',
          screen: { id: 'messages', peerAddress },
        })
      }>
      <Avatar handle={peerAddress} onClick={() => null} />
      <div className="ConversationListItem TopLineContainer">
        <span className="ConversationListItem Title">{responsiveName}</span>
        <span className="ConversationListItem Time">
          {setConversationTime(topMessageTime)}
        </span>
      </div>
      <span className="ConversationListItem Subtitle">{subtitle}</span>
    </li>
  );
};
