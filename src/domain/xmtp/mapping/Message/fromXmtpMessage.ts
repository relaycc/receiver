import { DecodedMessage } from '@xmtp/xmtp-js';
import { Message } from './Message';
import { isEthAddress } from '../../../eth';

export const fromXmtpMessage = (message: DecodedMessage): Message => {
  return {
    id: message.id,
    recipientAddress: (() => {
      if (!isEthAddress(message.recipientAddress)) {
        throw new Error('Invalid recipient address');
      } else {
        return message.recipientAddress;
      }
    })(),
    senderAddress: (() => {
      if (!isEthAddress(message.senderAddress)) {
        throw new Error('Invalid sender address');
      } else {
        return message.senderAddress;
      }
    })(),
    sent: message.sent,
    content: message.content,
  };
};
