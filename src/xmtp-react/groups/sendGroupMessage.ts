import { Client } from '@xmtp/xmtp-js';
import { GROUP_MESSAGE_CONTENT_TYPE } from './GroupMessageContentType';
import { GroupMessageContent } from './GroupMessageContent';

export const sendGroupMessage = async (
  client: Client,
  content: GroupMessageContent
) => {
  for (const peerAddress of content.participantAddresses) {
    const peerIsOnNetwork = Boolean(await client.canMessage(peerAddress));
    if (!peerIsOnNetwork) {
      return false;
    }
  }

  return await Promise.all(
    content.participantAddresses.map((peerAddress) => {
      return client.sendMessage(peerAddress, content, {
        contentType: GROUP_MESSAGE_CONTENT_TYPE,
      });
    })
  );
};
