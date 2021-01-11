import gql from 'graphql-tag';

export const createJobMutation = gql`
    mutation createJobMutation(
      $name: String!
      $address: String!
      $salaryType: SalaryType!
      $jobSectorSlug: String!
      $jobTypeSlug: String!
      $jobPositionSlug: String!
      $citySlug: String!
      $salaryMin: Float
      $salaryMax: Float
      $description: String!
    ) {
      createJob(
        input: {
          name: $name
          address: $address
          salaryType: $salaryType
          jobSectorSlug: $jobSectorSlug
          jobTypeSlug: $jobTypeSlug
          jobPositionSlug: $jobPositionSlug
          citySlug: $citySlug
          salaryMin: $salaryMin
          salaryMax: $salaryMax
          description: $description
      }) {
        ok
        jobId
        error
      }
    }
`;

export const jobsQuery = gql`
  query jobsQuery($page: Int!) {
    jobsByCandidate(input: {
      page: $page
    }) {
      ok
      error
      totalPages
      totalResults
      jobs {
        id
        name
        city {
          name
        }
        jobPosition {
          name
        }
        jobType {
          name
        }
        jobSector {
          name
        }
        address
        promotedUntil
        createdAt
        updatedAt
      }
    }
  }
`;

export const jobQuery = gql`
  query jobQuery($id: Int!) {
    job(input: { id: $id }) {
      ok
      error
      job {
        id
        name
        salaryType
        salaryMin
        salaryMax
        city {
          name
          slug
        }
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
        address
        description
      }
    }
  }
`;

export const editJobMutation = gql`
  mutation createJobMutation(
    $id: Int!
    $name: String!
    $address: String!
    $salaryType: SalaryType!
    $jobSectorSlug: String!
    $jobTypeSlug: String!
    $jobPositionSlug: String!
    $citySlug: String!
    $salaryMin: Float
    $salaryMax: Float
    $description: String!
  ) {
    editJob(
      input: {
        id: $id
        name: $name
        address: $address
        salaryType: $salaryType
        jobSectorSlug: $jobSectorSlug
        jobTypeSlug: $jobTypeSlug
        jobPositionSlug: $jobPositionSlug
        citySlug: $citySlug
        salaryMin: $salaryMin
        salaryMax: $salaryMax
        description: $description
      }) {
      ok
      error
    }
  }
`;

export const deleteJobMutation = gql`
  mutation deleteJobMutation($id: Int!) {
    deleteJob(input: {
      id: $id
    }){
      ok
      error
    }
  }
`;
