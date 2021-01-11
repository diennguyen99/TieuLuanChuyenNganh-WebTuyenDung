import { Injectable } from '@angular/core';
import { ApolloAngularSDK, SearchJobsInput } from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class JobListService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  filterJob(searchJobsInput: SearchJobsInput): any {
    return this.sdk.filterJob({ input: searchJobsInput });
  }
}
