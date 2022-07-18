/// <reference types="react" />
import { Message } from '@xmtp/xmtp-js';
interface MessagesBucketProps {
    peerAddress: string;
    sentByAddress: string | undefined;
    startDate: Date | undefined;
    messages: Message[];
}
export default function MessagesBucket(props: MessagesBucketProps): JSX.Element | null;
export {};
