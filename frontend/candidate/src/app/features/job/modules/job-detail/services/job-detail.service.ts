import { Injectable } from '@angular/core';
import { ApolloAngularSDK } from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class JobDetailService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  job(slug: string): any {
    return this.sdk.job({ input: { slug } });
  }
}
