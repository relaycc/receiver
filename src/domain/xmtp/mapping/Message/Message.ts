import { EthAddress } from '../../../eth';

export interface Message {
  id: string;
  recipientAddress: EthAddress;
  senderAddress: EthAddress;
  sent: Date;
  content: unknown;
}
