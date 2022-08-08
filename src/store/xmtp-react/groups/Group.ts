import { GroupMessage } from './GroupMessage';
import { v4 as uuid } from 'uuid';

export interface Group {
  id: string;
  participantAddresses: string[];
}

export const fromGroupMessage = (message: GroupMessage): Group => {
  return {
    id: message.content.groupId,
    participantAddresses: message.content.participantAddresses,
  };
};

export const fromPeerAddresses = (peerAddresses: string[]): Group => {
  return {
    id: uuid(),
    participantAddresses: peerAddresses,
  };
};
