import { request, gql } from 'graphql-request';
import { LensProfile, LensProfilesQueryResponse } from './helpers';

export const fetchProfileByHandle = (handle: string) => {
  return request('https://api.lens.dev', profileByHandleQuery, {
    request: { handle },
  }) as Promise<LensProfile | null | undefined>;
};

export const fetchProfilesByAddress = (address: string) => {
  return request('https://api.lens.dev', profilesQuery, {
    request: { ownedBy: [address] },
  }) as Promise<LensProfilesQueryResponse | undefined>;
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
