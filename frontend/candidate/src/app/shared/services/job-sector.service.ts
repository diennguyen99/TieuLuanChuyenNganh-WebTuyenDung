import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';

export interface JobSector {
  id: number;
  name: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobSectorService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getAllJobSectors(): Observable<ApolloQueryResult<{ jobSectors: { ok: boolean, error?: string, results: Array<JobSector>}}>> {
    return this.apollo
    .query({
      query: gql`
        {
          jobSectors {
            ok
            results {
              name
              slug
            }
            error
          }
        }
      `
    });
  }
}
