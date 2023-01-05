import React, { FunctionComponent } from 'react';
import { truncateAddress } from '../../../utils/address';
import { Avatar } from '../../Elements/Avatar';
import { LoadingText } from '../../Elements/LoadingText';
import { isEthAddress, Group } from '../../../hooks';

export interface GroupInfoProps {
  group?: Group | null;
}

export const GroupInfo: FunctionComponent<GroupInfoProps> = ({ group }) => {
  const primaryId = group?.name || group?.wallet.wallet.address || 'loading';
  const secondaryId = group?.description || 'No Description Available';
  return (
    <div className="AddressInfo Container">
      <Avatar
        handle={group?.wallet.wallet.address || 'Loading'}
        onClick={() => null}
      />
      <div className="AddressInfo TextContainer">
        {primaryId === 'loading' && <LoadingText />}
        {primaryId === 'loading' || (
          <div className="AddressInfo MainText">
            {isEthAddress(primaryId) ? truncateAddress(primaryId) : primaryId}
          </div>
        )}
        <div className="AddressInfo SubText">{secondaryId}</div>
      </div>
    </div>
  );
};
