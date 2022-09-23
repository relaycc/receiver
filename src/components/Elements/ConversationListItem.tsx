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
<<<<<<< HEAD
      <div className="ConversationListItem TopLineContainer">
        <span className="ConversationListItem Title">{responsiveName}</span>
        <span className="ConversationListItem Time">
          {setConversationTime(topMessageTime)}
        </span>
      </div>
      <span className="ConversationListItem Subtitle">{subtitle}</span>
=======
      <div className="ConversationListItem TextContainer">
        <span className="ConversationListItem Title">{responsiveName}</span>
        <div className="ConversationListItem Subtitle">{subtitle}</div>
      </div>
      <div className="ConversationListItem Time">{responsiveTime}</div>
>>>>>>> 50829dc0f667d63dc00cb57cd06bef45b1264926
    </li>
  );
};
