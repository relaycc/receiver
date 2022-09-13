import { useEffect, useState } from 'react';
import { getAddress } from 'ethers/lib/utils';
import { request, gql } from 'graphql-request';
import { Address, isLensName } from './types';

export const useLensAddress = ({
  handle,
}: {
  handle?: string | null;
}): Address => {
  const [state, setState] = useState<Address>({
    address: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchAddress = async (handle: string) => {
      setState({ status: 'fetching', address: undefined });
      const { profile } = await request(
        'https://api.lens.dev',
        profileByHandleQuery,
        {
          request: { handle },
        }
      );
      if (profile === null) {
        setState({ status: 'settled', address: undefined });
      } else {
        setState({
          status: 'settled',
          address: getAddress(profile.ownedBy),
        });
      }
    };

    if (!isLensName(handle)) {
      setState({ address: undefined, status: 'noop' });
    } else {
      fetchAddress(handle);
    }
  }, [handle]);

  return state;
};

const profileByHandleQuery = gql`
  query Profile($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      handle
      ownedBy
    }
  }
`;
