import gql from 'graphql-tag';

export const listSearchCampaignResumeQuery = gql`
  query listSearchCampaignResumeQuery($page: Int!) {
    listSearchCampaignResumes(input: {
      page: $page
    }) {
      ok
      totalPages
      totalResults
      listSearchCampaign {
        id
        name
        skills
        jobPosition {
          name
          slug
        }
        jobType {
          name
          slug
        }
        jobSector {
          name
          slug
        }
        city {
          name
          slug
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const createSearchCampaignResumeMuation = gql`
    mutation createSearchCampaignResume(
      $name: String!
      $skills: [String!]!
      $jobPositionSlug: String!
      $jobTypeSlug: String!
      $jobSectorSlug: String!
      $citySlug: String!
    ) {
      createSearchCampaignResume(input: {
        name: $name
        skills: $skills
        jobPositionSlug: $jobPositionSlug
        jobTypeSlug: $jobTypeSlug
        jobSectorSlug: $jobSectorSlug
        citySlug: $citySlug
      }) {
        ok
        error
      }
    }
`;

export const editSearchCampaignResumeMuation = gql`
  mutation editSearchCampaignResume(
    $id: Int!
    $name: String!
    $skills: [String!]!
    $jobPositionSlug: String!
    $jobTypeSlug: String!
    $jobSectorSlug: String!
    $citySlug: String!
  ) {
    editSearchCampaignResume(input: {
      id: $id
      name: $name
      skills: $skills
      jobPositionSlug: $jobPositionSlug
      jobTypeSlug: $jobTypeSlug
      jobSectorSlug: $jobSectorSlug
      citySlug: $citySlug
    }) {
      ok
      error
    }
  }
`;

export const deleteSearchCampaignResumeMuation = gql`
  mutation deleteSearchCampaignResume(
    $id: Int!
  ) {
    deleteSearchCampaignResume(input: {
      id: $id
    }) {
      ok
      error
    }
  }
`;

export const searchResumesQuery = gql`
  query searchResumesQuery($id: Int!, $page: Int!) {
    searchResumes(input: {
      id: $id
      page: $page
    }) {
      ok
      error
      totalPages
      totalResults
      searchCampaign {
        name
        skills
        jobPosition {
          name
          slug
        }
        jobType {
          name
          slug
        }
        jobSector {
          name
          slug
        }
        city {
          name
          slug
        }
      }
      resumes {
        id
        user {
          name
          description
          city {
            name
            slug
          }
          updatedAt
        }
      }
    }
  }
`;
