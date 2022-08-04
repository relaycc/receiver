import { useMemo } from 'react';
import { useXmtp, Status, ReadyXmtp } from './../context';
import { Client, Conversation, Message } from '@xmtp/xmtp-js';

export const fetchMessages = async (xmtp: ReadyXmtp, peerAddress: string) => {
  const conversation = await xmtp.client.conversations.newConversation(peerAddress)

    /*
    * Stream messages for each existing conversation...
    */
    streamConversation(conversation);

  return await loadConversation(conversation);;
};


const loadConversation = async (
  conversation: Conversation,
  waitForMessagesMs = 0
) => {
  // TODO This might be a bug in XMTP, reach out to them.
  await new Promise((_) => setTimeout(_, waitForMessagesMs));
  return await conversation.messages({ pageSize: 100 });
};

const streamConversation = async (
  conversation: Conversation,
) => {
  // TODO This might be a bug in XMTP, reach out to them.
  await new Promise((_) => setTimeout(_, 2000));
  return await conversation.streamMessages();
};
