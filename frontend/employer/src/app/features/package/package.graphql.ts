import gql from 'graphql-tag';

export const packagesQuery = gql`
  query {
    packages {
      ok
      error
      results {
        id
        name
        price
        duration
        isFeatured
        isSupport
        packageType
      }
    }
  }
`;
