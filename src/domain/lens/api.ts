import { request, gql } from 'graphql-request';
import { EthAddress } from '../eth';
import { LensName } from './LensName';
import { isLensProfile } from './LensProfile';
import { isLensProfilesQueryResponse } from './LensProfilesQueryResponse';

export const fetchProfileByHandle = async (handle: LensName) => {
  const response = await request('https://api.lens.dev', profileByHandleQuery, {
    request: { handle },
  });
  const profile = response?.profile || null;
  if (!isLensProfile(profile)) {
    return null;
  } else {
    return profile;
  }
};

export const fetchProfilesByAddress = async (address: EthAddress) => {
  const response = await request('https://api.lens.dev', profilesQuery, {
    request: { ownedBy: [address] },
  });
  if (!isLensProfilesQueryResponse(response)) {
    return null;
  } else {
    return response;
  }
};

const profileByHandleQuery = gql`
  query Profile($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      handle
      ownedBy
    }
  }
`;

const profilesQuery = gql`
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
