import React, { FunctionComponent } from 'react';
import { Avatar } from './Avatar';
import { useResponsiveName, useEnsName } from '../../hooks';
import { useReceiver } from '../../hooks';

export interface ConversationListItemProps {
  peerAddress: string;
  subtitle: string;
}

export const ConversationListItem: FunctionComponent<
  ConversationListItemProps
> = ({ peerAddress, subtitle }) => {
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
      <div className="ConversationListItem TextContainer">
        <span className="ConversationListItem Title">{responsiveName}</span>
        <span className="ConversationListItem Subtitle">{subtitle}</span>
      </div>
    </li>
  );
};
