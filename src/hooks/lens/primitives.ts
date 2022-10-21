import { request, gql } from 'graphql-request';
import { LensProfile, LensProfilesQueryResponse } from './helpers';

export const fetchProfileByHandle = async (handle: string) => {
  const response = await request('https://api.lens.dev', profileByHandleQuery, {
    request: { handle },
  });
  return (response ? response.profile || undefined : undefined) as
    | LensProfile
    | undefined;
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
