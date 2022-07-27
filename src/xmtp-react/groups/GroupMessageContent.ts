import { Group } from './Group';
import { v4 as uuid } from 'uuid';

export interface GroupMessageContent {
  groupId: string;
  groupMessageId: string;
  participantAddresses: string[];
  payload: string;
}

export const GROUP_MESSAGE_FALLBACK_CONTENT = {
  groupId: '',
  groupMessageId: '',
  participantAddresses: [],
  payload: '',
};

export const isGroupMessageContent = (
  content: unknown
): content is GroupMessageContent => {
  try {
    const { groupId, groupMessageId, participantAddresses, payload } =
      content as GroupMessageContent;

    if (!(typeof groupId === 'string')) return false;
    if (!(typeof groupMessageId === 'string')) return false;
    if (!(typeof payload === 'string')) return false;
    if (
      !participantAddresses.every((pa) => {
        // TODO Do real address validation.
        return (
          typeof pa === 'string' && pa.length === 42 && pa.startsWith('0x')
        );
      })
    ) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const fromGroupAndPayload = (
  group: Group,
  payload: string
): GroupMessageContent => {
  return {
    groupId: group.id,
    groupMessageId: uuid(),
    participantAddresses: group.participantAddresses,
    payload,
  };
};
