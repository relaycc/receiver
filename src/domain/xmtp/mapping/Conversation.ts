import { Conversation as XmtpConversation } from '@xmtp/xmtp-js';
import { EthAddress, isEthAddress } from '../../eth';

export interface Conversation {
  peerAddress: EthAddress;
}

export const fromXmtpConversation = (
  conversation: XmtpConversation
): Conversation => {
  if (!isEthAddress(conversation.peerAddress)) {
    throw new Error('Invalid peer address');
  } else {
    return { peerAddress: conversation.peerAddress };
  }
};
