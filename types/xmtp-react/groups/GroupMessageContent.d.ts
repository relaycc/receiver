import { Group } from './Group';
export interface GroupMessageContent {
    groupId: string;
    groupMessageId: string;
    participantAddresses: string[];
    payload: string;
}
export declare const GROUP_MESSAGE_FALLBACK_CONTENT: {
    groupId: string;
    groupMessageId: string;
    participantAddresses: never[];
    payload: string;
};
export declare const isGroupMessageContent: (content: unknown) => content is GroupMessageContent;
export declare const fromGroupAndPayload: (group: Group, payload: string) => GroupMessageContent;
