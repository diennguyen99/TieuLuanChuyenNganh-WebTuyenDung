import {Injectable} from '@angular/core';
import {ApolloAngularSDK} from '../../../../../../generated/graphql';

@Injectable()
export class AppliedJobsService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  appliedJobs(page: number): any {
    return  this.sdk.appliedJobs({ input: { page }});
  }
}
