import { Injectable } from '@angular/core';
import {ApolloAngularSDK} from '../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class JobTypeService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  jobTypes(): any {
    return this.sdk.jobTypesQuery();
  }
}
