import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';

export interface JobType {
  id: number;
  name: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getAllJobTypes(): Observable<ApolloQueryResult<{ jobTypes: { ok: boolean, error?: string, results: Array<JobType>}}>> {
    return this.apollo
      .query({
        query: gql`
          {
            jobTypes {
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
