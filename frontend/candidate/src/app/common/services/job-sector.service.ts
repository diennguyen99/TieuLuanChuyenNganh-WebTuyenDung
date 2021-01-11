import { Injectable } from '@angular/core';
import { ApolloAngularSDK } from '../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class JobSectorService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  jobSectors(): any {
    return this.sdk.jobSectorsQuery();
  }
}
