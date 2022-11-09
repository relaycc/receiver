import { Client as XmtpClient } from '@xmtp/xmtp-js';
import { EthAddress, isEthAddress } from '../../eth';

export interface Client {
  address: EthAddress;
}

export const fromXmtpClient = (client: XmtpClient): Client => {
  if (!isEthAddress(client.address)) {
    throw new Error('Invalid client address');
  } else {
    return { address: client.address };
  }
};
