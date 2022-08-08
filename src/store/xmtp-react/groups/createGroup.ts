import { Client } from '@xmtp/xmtp-js';
import { sendGroupMessage } from './sendGroupMessage';
import { fromPeerAddresses } from './Group';
import { fromGroupAndPayload } from './GroupMessageContent';

export const createGroup = async (
  client: Client,
  peerAddresses: string[],
  introText: string
) => {
  for (const peerAddress of peerAddresses) {
    const peerIsOnNetwork = Boolean(await client.canMessage(peerAddress));
    if (!peerIsOnNetwork) {
      throw new Error('one of the peers is not initialized');
    }
  }

  // Make sure that the current user's address is always in the group.
  const participantAddresses = uniqueStrings([
    ...peerAddresses,
    client.address,
  ]);
  const group = fromPeerAddresses(participantAddresses);
  const content = fromGroupAndPayload(group, introText);

  await sendGroupMessage(client, content);

  return group.id;
};

const uniqueStrings = (strings: string[]): string[] => {
  const unique: Record<string, string> = {};
  for (const str of strings) {
    unique[str] = str;
  }
  return Object.values(unique);
};
