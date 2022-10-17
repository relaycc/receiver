import { Client, Message } from '@relaycc/xmtp-js';
import { messageApi } from '@xmtp/proto';

export interface NoMostRecentResult {
  status: 'no messages';
  message: undefined;
}

export interface MostRecentResult {
  status: 'success';
  message: Message;
}

export interface UnknownFailureMostRecentResult {
  status: 'unknown failure';
  message: undefined;
}

export type FetchMostRecentResult =
  | NoMostRecentResult
  | MostRecentResult
  | UnknownFailureMostRecentResult;

export const fetchMostRecentMessage = async (
  peerAddress: string,
  client: Client
): Promise<FetchMostRecentResult> => {
  try {
    const list = await client.listConversationMessages(peerAddress, {
      limit: 1,
      direction: messageApi.SortDirection.SORT_DIRECTION_DESCENDING,
    });
    const message = list.pop();
    if (message === undefined) {
      return { status: 'no messages', message };
    } else {
      return { status: 'success', message };
    }
  } catch {
    return { status: 'unknown failure', message: undefined };
  }
};
