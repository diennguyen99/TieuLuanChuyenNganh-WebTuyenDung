import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

import { OutputBase } from '../../core/models/output.model';
import { JobType } from '../../core/models/job-type.model';

export const jobTypesQuery = gql`
  query {
    jobTypes {
      ok
      error
      results {
        name
        slug
      }
    }
  }
`;

interface JobTypes extends OutputBase {
  results: JobType[];
}

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getJobTypes(): Observable<ApolloQueryResult<{ jobTypes: JobTypes }>> {
    return this.apollo
      .query({
        query: jobTypesQuery
      });
  }
}
