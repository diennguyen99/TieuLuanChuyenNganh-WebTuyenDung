import { Injectable } from '@angular/core';
import { ApolloAngularSDK } from '../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class ResumeOpenService {
  constructor(private readonly sdk: ApolloAngularSDK) {}


}
