import React, { useState } from 'react';
import {
  InfoCard,
  LoadingList,
  MessageInput,
  MessageList,
} from '../../Elements';
import { FunctionComponent } from 'react';
import { EthAddress } from '../../../domain';

export interface InvalidHandleProps {
  status: 'invalid handle';
  handle: string;
}

export interface LoadingPeerProps {
  status: 'loading peer';
}

export interface NoPeerProps {
  status: 'no peer';
}

export interface LoadingMessagesProps {
  status: 'loading messages';
}

export interface NoMessagesProps {
  status: 'no messages';
}

export interface MessagesProps {
  status: 'messages';
  peerAddress: EthAddress;
  walletAddress: EthAddress;
}

export type ViewProps =
  | InvalidHandleProps
  | LoadingPeerProps
  | NoPeerProps
  | LoadingMessagesProps
  | NoMessagesProps
  | MessagesProps;

export const View: FunctionComponent<ViewProps> = (props) => {
  const [scrollMessageList, setScrollMessageList] = useState<() => unknown>(
    () => null
  );
  switch (props.status) {
    case 'invalid handle':
      return <InfoCard variant="invalid handle" handle={props.handle} />;
    case 'loading peer':
      return (
        <>
          <LoadingList />
          <MessageInput
            onEnterPressed={scrollMessageList}
            onSendMessage={() => null}
          />
        </>
      );
    case 'no peer':
      return <InfoCard variant="no peer" />;
    case 'loading messages':
      return (
        <>
          <LoadingList />
          <MessageInput
            onEnterPressed={scrollMessageList}
            onSendMessage={() => 'TODO DONT FORGET'}
          />
        </>
      );
    case 'no messages':
      return (
        <>
          <InfoCard variant="no messages" />
          <MessageInput
            onEnterPressed={scrollMessageList}
            onSendMessage={() => 'TODO DONT FORGET'}
          />
        </>
      );
    case 'messages':
      return (
        <>
          <MessageList
            clientAddress={props.walletAddress}
            peerAddress={props.peerAddress}
            setDoScroll={setScrollMessageList}
          />
          <MessageInput
            onEnterPressed={scrollMessageList}
            onSendMessage={() => 'TODO DONT FORGET'}
          />
        </>
      );

    default:
      return <InfoCard variant="no peer" />;
  }
};
