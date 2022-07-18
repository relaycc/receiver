export declare enum Status {
    ready = "ready",
    idle = "idle"
}
export interface ReadySendMessage {
    status: Status.ready;
    send: (peerAddress: string, content: string) => Promise<unknown>;
}
export interface IdleSendMessage {
    status: Status.idle;
}
export declare type SendMessage = ReadySendMessage | IdleSendMessage;
export declare const useSendMessage: () => SendMessage;
