import { Client, Conversation, Message, Conversations } from '@xmtp/xmtp-js';
import { GroupMessageCodec, GroupMessage, isGroupMessage } from './groups';
import { Signer } from 'ethers';

const gmc = new GroupMessageCodec();

export const initialize = async (
  wallet: Signer,
  onWaitingForSignature: () => unknown,
  onClientConnect: (client: Client) => unknown,
  onClientError: (error: unknown) => unknown
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
    console.log('im trying to create')
    const client = await Client.create(wallet, {
      codecs: [gmc],
      env: 'production'
    });

    onClientConnect(client);

  } catch (error) {
    console.log(error);
    onClientError(error);
  }
};
