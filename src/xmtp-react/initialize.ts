import { Client, Conversation, Message, Conversations } from '@xmtp/xmtp-js';
import { GroupMessageCodec, GroupMessage, isGroupMessage } from './groups';
import { Signer } from 'ethers';

const gmc = new GroupMessageCodec();

export const initialize = async (
  wallet: Signer,
  peerAddress: string | null,
  onWaitingForSignature: () => unknown,
  onClientConnect: (client: Client) => unknown,
  onClientError: (error: unknown) => unknown,
  onNewConversation: (conversation: Conversation) => unknown,
  onConversationsLoaded: (conversations: Conversation[]) => unknown,
  onNewMessage: (conversation: Conversation, message: Message) => unknown,
  onNewGroupMessage: (message: GroupMessage) => unknown,
  onMessagesLoaded: () => unknown
) => {
  try {
    if (!wallet) return;
    
    /*
     * Trigger loading state...
     */
    onWaitingForSignature();
    /*
     * Initialize client...
     */
    const client = await Client.create(wallet, {
      codecs: [gmc],
      env: 'production'
    });

    onClientConnect(client);

    /*
     * Load all existing conversations and messages
     */
    /*const allConversations = await client.conversations.list();
    const conversations = allConversations.filter((conversation) => 
      conversation.peerAddress == peerAddress
    )*/

    let conversations: Conversation[] = []
    peerAddress && conversations.push(await client.conversations.newConversation(peerAddress));

    onConversationsLoaded(conversations);
    for (const conversation of conversations) {
      await loadConversation(
        conversation,
        onNewConversation,
        onNewMessage,
        onNewGroupMessage
      );
    }
     /* Stream messages for each existing conversation...
     */
    for (const conversation of conversations) {
      streamConversation(conversation, onNewMessage, onNewGroupMessage);
    }

    onMessagesLoaded();

    /*
     * Stream new conversations
     */
    const conversationsStream = await client.conversations.stream();
    for await (const conversation of conversationsStream) {
      loadConversation(
        conversation,
        onNewConversation,
        onNewMessage,
        onNewGroupMessage,
        2000
      );
      streamConversation(conversation, onNewMessage, onNewGroupMessage);
    }

  } catch (error) {
    onClientError(error);
  }
};

const loadConversation = async (
  conversation: Conversation,
  onNewConversation: (conversation: Conversation) => unknown,
  onNewMessage: (conversation: Conversation, message: Message) => unknown,
  onNewGroupMessage: (message: GroupMessage) => unknown,
  waitForMessagesMs = 0
) => {
  // TODO This might be a bug in XMTP, reach out to them.
  await new Promise((_) => setTimeout(_, waitForMessagesMs));
  const messages = await conversation.messages({ pageSize: 100 });
  for (const message of messages) {
    if (isGroupMessage(message)) {
      onNewGroupMessage(message);
    } else {
      onNewMessage(conversation, message);
    }
  }
  onNewConversation(conversation);
};

const streamConversation = async (
  conversation: Conversation,
  onNewMessage: (conversation: Conversation, message: Message) => unknown,
  onNewGroupMessage: (message: GroupMessage) => unknown
) => {
  // TODO This might be a bug in XMTP, reach out to them.
  await new Promise((_) => setTimeout(_, 2000));
  const messagesStream = await conversation.streamMessages();
  for await (const message of messagesStream) {
    if (isGroupMessage(message)) {
      onNewGroupMessage(message);
    } else {
      onNewMessage(conversation, message);
    }
  }
};
