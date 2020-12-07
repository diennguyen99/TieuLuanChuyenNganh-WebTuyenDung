import gql from 'graphql-tag';

export const editAvatar = gql`
  mutation editAvatar($avatar: String!) {
    editAvatar(input: { avatar: $avatar }) {
      ok
      error
    }
  }
`;

export const editEducation = gql`
  type CreateEducationInput {
    title: String!
    yearn: Float!
    institute: String!
  }

  mutation editEducation($educations: [CreateEducationInput]!) {
    editEducation(input: { educations: $educations }) {
      ok
      error
    }
  }
`;
