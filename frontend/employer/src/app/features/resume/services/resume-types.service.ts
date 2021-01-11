import {Injectable} from '@angular/core';
import {ApolloAngularSDK} from '../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class ResumeTypesService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  resumeTypes(): any {
    return this.sdk.resumeTypes();
  }
}

