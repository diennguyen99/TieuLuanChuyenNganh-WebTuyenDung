import { Injectable } from '@angular/core';
import { ApolloAngularSDK } from '../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class JobPositionService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  jobPositions(): any {
    return this.sdk.jobPositionsQuery();
  }
}
