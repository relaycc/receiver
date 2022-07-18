import { Client } from '@xmtp/xmtp-js';
export declare const createGroup: (client: Client, peerAddresses: string[], introText: string) => Promise<string>;
