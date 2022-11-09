import React, { FunctionComponent } from 'react';
import {
  EthAddress,
  Handle,
  LensName,
  isLensName,
  isEnsName,
  isEthAddress,
  EnsName,
} from '../../../domain';
import {
  useLensAddress,
  useEnsAddress,
  useLensName,
  useEnsName,
} from '../../../hooks';
import { LoadingText } from '../LoadingText';
import { truncateAddress } from '../../../utils';

export interface SecondaryIdProps {
  handle: Handle;
}

export const SecondaryId: FunctionComponent<SecondaryIdProps> = ({
  handle,
}) => {
  if (isLensName(handle)) {
    return <Lens name={handle} />;
  } else if (isEnsName(handle)) {
    return <Ens name={handle} />;
  } else if (isEthAddress(handle)) {
    return <Address address={handle} />;
  } else {
    throw new Error('Invalid handle');
  }
};

const Lens = ({ name }: { name: LensName }) => {
  const lensAddress = useLensAddress({ handle: name });
  if (lensAddress.isLoading) {
    return <View status="loading" />;
  } else {
    if (lensAddress.data === null || lensAddress.data === undefined) {
      return <View status="invalid handle" handle={name} />;
    } else {
      return (
        <View status="ready" primaryId={truncateAddress(lensAddress.data)} />
      );
    }
  }
};

const Ens = ({ name }: { name: EnsName }) => {
  const ensAddress = useEnsAddress({ handle: name });
  if (ensAddress.isLoading) {
    return <View status="loading" />;
  } else {
    if (ensAddress.data === null || ensAddress.data === undefined) {
      return <View status="invalid handle" handle={name} />;
    } else {
      return (
        <View status="ready" primaryId={truncateAddress(ensAddress.data)} />
      );
    }
  }
};

export const Address = ({ address }: { address: EthAddress }) => {
  const lens = useLensName({ handle: address });
  const ens = useEnsName({ handle: address });

  if (lens.data !== null && lens.data !== undefined) {
    return <View primaryId={address} status="ready" />;
  } else {
    if (ens.data !== null && ens.data !== undefined) {
      return <View primaryId={address} status="ready" />;
    } else {
      if (lens.isLoading || ens.isLoading) {
        return <View status="loading" />;
      } else {
        return <View status="invalid handle" handle={address} />;
      }
    }
  }
};

interface NoAddressProps {
  status: 'invalid handle';
  handle: string;
}

interface LoadingProps {
  status: 'loading';
}

interface ReadyProps {
  status: 'ready';
  primaryId: string;
}

type ViewProps = NoAddressProps | LoadingProps | ReadyProps;

const View = (props: ViewProps) => {
  switch (props.status) {
    case 'invalid handle':
      return null;
    case 'loading':
      return <LoadingText />;
    case 'ready':
      return <div className="AddressInfo MainText">{props.primaryId}</div>;
  }
};
