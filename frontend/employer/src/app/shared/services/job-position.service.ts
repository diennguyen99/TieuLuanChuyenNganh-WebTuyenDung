import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';

import { OutputBase } from '../../core/models/output.model';
import { JobPosition } from '../../core/models/job-position.model';

export const jobPositionQuery = gql`
  query {
    jobPositions {
      ok,
      error
      results {
        name
        slug
      }
    }
  }
`;

interface JobPositions extends OutputBase {
  results: JobPosition[];
}

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getJobPositions(): Observable<ApolloQueryResult<{ jobPositions: JobPositions }>> {
    return this.apollo
      .query({
        query: jobPositionQuery
      });
  }
}
