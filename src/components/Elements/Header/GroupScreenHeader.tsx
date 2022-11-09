import React, { useCallback } from 'react';
import {
  useReceiver,
  useGroups,
  useGroup,
  useWalletAddress,
} from '../../../hooks';
import { EthAddress } from '../../../domain';
import { GroupInfo } from '../GroupInfo';
import { LoadingSpinner } from '../LoadingSpinner';
import { ExitIcon, GoBackIcon, LeaveGroupIcon } from '../MenuIcons';

export const GroupScreenHeader = ({ address }: { address: EthAddress }) => {
  const dispatch = useReceiver((state) => state.dispatch);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const { leave } = useGroup();
  const walletAddress = useWalletAddress();
  const groups = useGroups(walletAddress);
  const group = (() => {
    if (groups.data === undefined) {
      return undefined;
    } else {
      return groups.data.groups[address];
    }
  })();

  const doClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const goBack = useCallback(() => {
    dispatch({ id: 'go back screen' });
  }, [dispatch]);

  return (
    <div className="Header HeaderWrapper">
      <GoBackIcon marginRight="10px" onClick={goBack} />
      {(() => {
        if (group === undefined) {
          return <GroupInfo status="loading" />;
        } else {
          return <GroupInfo status="ready" group={group} />;
        }
      })()}
      {(() => {
        if (leave.isLoading) {
          return <LoadingSpinner className="IgnoredLoadingSpinner" />;
        } else {
          return (
            <LeaveGroupIcon
              marginLeft="auto"
              marginRight="6px"
              onClick={() => {
                if (group === undefined) {
                  return;
                } else {
                  leave.mutate(group);
                  goBack();
                }
              }}
            />
          );
        }
      })()}
      <ExitIcon onClick={doClose} />
    </div>
  );
};
