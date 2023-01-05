import {
  Conversation,
  EthAddress,
  isConversation,
  useReadValue,
  XmtpWorkerQueryResult,
} from '@relaycc/xmtp-hooks';

export const usePinnedConversations = ({
  clientAddress,
}: {
  clientAddress?: EthAddress | null;
}): XmtpWorkerQueryResult<Conversation[] | null> => {
  const pinnedConversations = useReadValue({
    clientAddress,
    key: 'pinned-conversations',
  });
  console.log(
    'usePinnedConversations.ts: raw value: ',
    pinnedConversations.data
  );

  if (
    pinnedConversations.data === null ||
    pinnedConversations.data === undefined
  ) {
    return pinnedConversations as XmtpWorkerQueryResult<Conversation[] | null>;
  } else {
    if (
      Array.isArray(pinnedConversations.data) &&
      pinnedConversations.data.every(isConversation)
    ) {
      return {
        ...pinnedConversations,
        data: pinnedConversations.data as Conversation[],
      } as XmtpWorkerQueryResult<Conversation[]>;
    } else {
      return {
        ...pinnedConversations,
        data: [],
      } as XmtpWorkerQueryResult<Conversation[] | null>;
    }
  }
};
