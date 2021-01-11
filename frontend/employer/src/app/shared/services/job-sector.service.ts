import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

import { OutputBase } from '../../core/models/output.model';
import { JobSector } from '../../core/models/job-sector.model';

export const jobSectorsQuery = gql`
  query {
    jobSectors {
      ok
      error
      results {
        name
        slug
      }
    }
  }
`;

interface JobSectors extends OutputBase {
  results: JobSector[];
}

@Injectable({
  providedIn: 'root'
})
export class JobSectorService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getJobSectors(): Observable<ApolloQueryResult<{ jobSectors: JobSectors }>> {
    return this.apollo
      .query({
        query: jobSectorsQuery
      });
  }
}
