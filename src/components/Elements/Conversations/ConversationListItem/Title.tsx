import React, { FunctionComponent, useEffect } from 'react';
import {
  Handle,
  EthAddress,
  isLensName,
  isEnsName,
  isEthAddress,
} from '../../../../domain';
import { useEnsName, useLensName } from '../../../../hooks';

export interface TitleProps {
  handle: Handle;
  onNameResolve?: (name: string | null) => unknown;
  override?: string;
}

export const Title: FunctionComponent<TitleProps> = ({
  handle,
  override,
  onNameResolve,
}) => {
  if (isLensName(handle)) {
    return <View status="ready" name={handle} override={override} />;
  } else if (isEnsName(handle)) {
    return <View status="ready" name={handle} override={override} />;
  } else if (isEthAddress(handle)) {
    return (
      <Address
        onNameResolve={onNameResolve}
        address={handle}
        override={override}
      />
    );
  } else {
    throw new Error('Invalid handle');
  }
};

export const Address = ({
  address,
  override,
  onNameResolve,
}: {
  address: EthAddress;
  override?: string;
  onNameResolve?: (name: string | null) => unknown;
}) => {
  const lens = useLensName({ handle: address });
  const ens = useEnsName({ handle: address });

  // TODO We're only triggering on ENS resolution because the prop was named
  // onEnsResolve and I can't remember exactly what it does. Look into this and
  // see if we should trigger aon Lens resolve also.
  useEffect(() => {
    if (onNameResolve === undefined) {
      return;
    } else {
      onNameResolve(ens.data || null);
    }
  }, [ens.data]);

  if (lens.isLoading) {
    return <View status="loading" />;
  } else {
    if (lens.data === null || lens.data === undefined) {
      if (ens.isLoading) {
        return <View status="loading" />;
      } else {
        if (ens.data === null || ens.data === undefined) {
          return <View name={address} status="ready" />;
        } else {
          return <View status="ready" name={ens.data} override={override} />;
        }
      }
    } else {
      return <View status="ready" name={lens.data} override={override} />;
    }
  }
};

export interface ReadyProps {
  status: 'ready';
  name: string;
  override?: string;
}

export interface LoadingProps {
  status: 'loading';
}

export interface NoneProps {
  status: 'none';
}

export type ViewProps = ReadyProps | LoadingProps | NoneProps;

export const View = (props: ViewProps) => {
  switch (props.status) {
    case 'ready':
      return (
        <span className="ConversationListItem Title">
          {props.override || props.name}
        </span>
      );
    case 'loading':
      return <span className="ConversationListItem Title">Loading...</span>;
    case 'none':
      return (
        <span className="ConversationListItem Title">
          Problem Looking Up Conversation
        </span>
      );
  }
};
