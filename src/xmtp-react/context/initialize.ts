import { Client, Conversation, Message } from '@xmtp/xmtp-js';
import { Signer } from '@ethersproject/abstract-signer';

export const initialize = async (
  wallet: Signer,
  peerAddress: string,
  onWaitingForSignature: () => unknown,
  onClientConnect: (client: Client) => unknown,
  onClientError: (error: unknown) => unknown,
  onNewConversation: (conversation: Conversation) => unknown,
  onConversationsLoaded: (conversations: Conversation[]) => unknown,
  onNewMessage: (conversation: Conversation, message: Message) => unknown,
  onMessagesLoaded: () => unknown
) => {
  try {
    /*
     * Trigger loading state...
     */
    onWaitingForSignature();
    /*
     * Initialize client...
     */
    const client = await Client.create(wallet, {
      env: 'production',
    });
    onClientConnect(client);

    /*
     * Load all existing conversations and messages
     */
    const allConversations = await client.conversations.list();
    const conversations = allConversations;

    onConversationsLoaded(conversations);
    for (const conversation of conversations) {
      await loadConversation(conversation, onNewConversation, onNewMessage);
    }
    onMessagesLoaded();

    /*
     * Stream messages for each existing conversation...
     */
    for (const conversation of conversations) {
      streamConversation(conversation, onNewMessage);
    }

    /*
     * Stream new conversations
     */
    const conversationsStream = await client.conversations.stream();
    for await (const conversation of conversationsStream) {
      loadConversation(conversation, onNewConversation, onNewMessage, 2000);
      streamConversation(conversation, onNewMessage);
    }
  } catch (error) {
    onClientError(error);
  }
};

const loadConversation = async (
  conversation: Conversation,
  onNewConversation: (conversation: Conversation) => unknown,
  onNewMessage: (conversation: Conversation, message: Message) => unknown,
  waitForMessagesMs = 0
) => {
  // TODO This might be a bug in XMTP, reach out to them.
  await new Promise((_) => setTimeout(_, waitForMessagesMs));
  const messages = await conversation.messages({ limit: 100 });
  for (const message of messages) {
    onNewMessage(conversation, message);
  }
  onNewConversation(conversation);
};

const streamConversation = async (
  conversation: Conversation,
  onNewMessage: (conversation: Conversation, message: Message) => unknown
) => {
  // TODO This might be a bug in XMTP, reach out to them.
  await new Promise((_) => setTimeout(_, 2000));
  const messagesStream = await conversation.streamMessages();
  for await (const message of messagesStream) {
    onNewMessage(conversation, message);
  }
};
