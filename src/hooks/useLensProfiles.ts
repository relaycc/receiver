import { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';
import {
  LensProfilesQueryResponse,
  LensProfiles,
  LensProfile,
  isEthAddress,
} from './types';

// TODO(achilles@relay.cc) Lens supports fetching by handle or by address, so we
// don't even need to convert handles into addresses here. Update this hook to
// support both input types.
export const useLensProfiles = ({
  address,
}: {
  address?: string | null;
}): LensProfiles => {
  const [state, setState] = useState<LensProfiles>({
    profiles: undefined,
    status: 'noop',
  });

  useEffect(() => {
    const fetchProfile = async (address: string) => {
      setState({ status: 'fetching', profiles: undefined });
      const data = await request('https://api.lens.dev', profileQuery, {
        request: { ownedBy: [address] },
      });
      // TODO(achilles@relay.cc) Make sure to look into what the different
      // responses can be here. Can profiles.items be null? Can profiles be null?
      if (data.profiles.items.length === 0) {
        setState({ status: 'settled', profiles: undefined });
      } else {
        setState({
          status: 'settled',
          profiles: data,
        });
      }
    };

    if (!isEthAddress(address)) {
      setState({ profiles: undefined, status: 'noop' });
    } else {
      fetchProfile(address);
    }
  }, [address]);

  return state;
};

export const getMostFollowedProfile = (
  profilesQueryResponse: LensProfilesQueryResponse
): LensProfile | undefined => {
  try {
    return profilesQueryResponse.profiles.items.reduce((result, profile) => {
      if (profile.stats.totalFollowers > result.stats.totalFollowers) {
        return profile;
      } else {
        return result;
      }
    });
  } catch {
    return undefined;
  }
};

export const getFirstProfile = (
  profilesQueryResponse: LensProfilesQueryResponse
): LensProfile | undefined => {
  try {
    return profilesQueryResponse.profiles.items[0];
  } catch {
    return undefined;
  }
};

export const getDefaultProfile = (
  profilesQueryResponse: LensProfilesQueryResponse
): LensProfile | undefined => {
  try {
    return profilesQueryResponse.profiles.items.find(
      (profile) => profile.isDefault
    );
  } catch {
    return undefined;
  }
};

export const getLensterUrl = (lensProfile: LensProfile): string => {
  return 'https://lenster.xyz/u/' + lensProfile.handle;
};

export const gatewayFromIpfs = (ipfsUrl: string): string => {
  if (!ipfsUrl.startsWith('ipfs://')) {
    throw new Error('Did not pass an IPFS url!');
  } else {
    return 'https://gateway.ipfs.io/ipfs/' + ipfsUrl.slice(7);
  }
};

export const isIpfsUrl = (maybeIpfsUrl: string): boolean => {
  return maybeIpfsUrl.startsWith('ipfs://');
};

const profileQuery = gql`
  query Profiles($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        name
        bio
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        handle
        ownedBy
        isDefault
        picture {
          ... on NftImage {
            uri
          }
          ... on MediaSet {
            original {
              url
            }
          }
        }
      }
    }
  }
`;
