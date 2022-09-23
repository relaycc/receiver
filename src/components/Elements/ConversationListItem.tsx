import React, { FunctionComponent } from 'react';
import { Avatar } from './Avatar';
import { useResponsiveName, useEnsName, useResponsiveTime } from '../../hooks';
import { useReceiver } from '../../hooks';

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
  const responsiveTime = useResponsiveTime(topMessageTime);

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
      <div className="ConversationListItem TextContainer">
        <span className="ConversationListItem Title">{responsiveName}</span>
        <div className="ConversationListItem Subtitle">{subtitle}</div>
      </div>
      <div className="ConversationListItem Time">{responsiveTime}</div>
    </li>
  );
};
