import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApolloQueryResult, FetchResult} from '@apollo/client/core';
import {JobSector} from '../../../shared/services/job-sector.service';
import {JobType} from '../../../shared/services/job-type.service';

enum UserSex {
  Male= 'Male',
  Female= 'Female'
}

export interface Profile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  phone: string;
  sex: UserSex;
  birthDay: Date;
  address: string;
  description: string;
  jobType: JobType;
  jobSector: JobSector;
}

const editProfile = gql`
  mutation editProfile($name: String!, $sex: UserSex!, $birthDay: DateTime!, $address: String!, $phone: String!, $description: String!, $jobTypeSlug: String!, $jobSectorSlug: String! ) {
    editProfile(input: { name: $name, sex: $sex, birthDay: $birthDay, address: $address, phone: $phone, description: $description, jobTypeSlug: $jobTypeSlug, jobSectorSlug: $jobSectorSlug }) {
      ok
      error
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private readonly apollo: Apollo
  ) {}

  getProfile(): Observable<ApolloQueryResult<{ me: Profile }>> {
    return this.apollo
    .query({
      query: gql`
        {
          me {
            email
            name
            phone
            sex
            birthDay
            address
            description
            jobType {
              slug
            }
            jobSector {
              slug
            }
          }
        }
      `
    });
  }

  editProfile(
    { name, sex, birthDay, phone, address, description, jobTypeSlug, jobSectorSlug }
  ): Observable<FetchResult<{ editProfile: {ok: boolean; error?: string}}>> {
    console.log({ name, sex, birthDay, phone, address, description, jobTypeSlug, jobSectorSlug });
    return this.apollo
      .mutate({
        mutation: editProfile,
        variables: { name, sex, birthDay, phone, address, description, jobTypeSlug, jobSectorSlug }
      });
  }
}
