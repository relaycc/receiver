import React, { FunctionComponent } from 'react';
import { Avatar } from './Avatar';
import { Group } from '../../domain';
import { AvatarView } from './Avatar';

interface LoadingProps {
  status: 'loading';
}

interface ReadyProps {
  status: 'ready';
  group: Group;
}

export type GroupInfoProps = LoadingProps | ReadyProps;

export const GroupInfo: FunctionComponent<GroupInfoProps> = (
  props: GroupInfoProps
) => {
  switch (props.status) {
    case 'loading':
      return <LoadingGroupInfo />;
    case 'ready':
      return <ReadyGroupInfo status="ready" group={props.group} />;
  }
};

const LoadingGroupInfo = () => {
  const primaryId = 'Loading Group...';
  const secondaryId = 'Loading Group Description...';
  return (
    <div className="AddressInfo Container">
      <AvatarView.View status="fallback" />
      <div className="AddressInfo TextContainer">
        <div className="AddressInfo MainText">{primaryId}</div>
        <div className="AddressInfo SubText">{secondaryId}</div>
      </div>
    </div>
  );
};

const ReadyGroupInfo: FunctionComponent<ReadyProps> = ({ group }) => {
  const primaryId = group.name;
  const secondaryId = group?.description || 'No Description Available';
  return (
    <div className="AddressInfo Container">
      <Avatar handle={group.wallet.wallet.address} onClick={() => null} />
      <div className="AddressInfo TextContainer">
        <div className="AddressInfo MainText">{primaryId}</div>
        <div className="AddressInfo SubText">{secondaryId}</div>
      </div>
    </div>
  );
};
