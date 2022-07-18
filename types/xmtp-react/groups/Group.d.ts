import { GroupMessage } from './GroupMessage';
export interface Group {
    id: string;
    participantAddresses: string[];
}
export declare const fromGroupMessage: (message: GroupMessage) => Group;
export declare const fromPeerAddresses: (peerAddresses: string[]) => Group;
