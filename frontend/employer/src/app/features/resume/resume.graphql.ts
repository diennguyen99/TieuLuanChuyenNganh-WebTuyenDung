import gql from 'graphql-tag';

export const resumesOpenNewQuery = gql`
    query resumesOpenNewQuery {
      resumesOpenNew {
        error
        ok
        resumesOpen {
          resumeStatus
          createdAt
          resumeType {
            id
          }
          user {
            name
            jobType {
              name
            }
            jobSector {
              name
            }
          }
          resume {
            id
            avatar
          }
        }
      }
    }
`;


export const appliedJobsQuery = gql`
    query getCandidatesApply(
      $page: Int!
    ) {
      getCandidatesApply(input: {
        page: $page
      }){
        ok
        error
        totalPages
        totalResults
        appliedJobs {
          id
          name
          email
          content
          cvOnline {
            id
          }
          cvUpload
          job {
            name
          }
        }
      }
    }
`;
