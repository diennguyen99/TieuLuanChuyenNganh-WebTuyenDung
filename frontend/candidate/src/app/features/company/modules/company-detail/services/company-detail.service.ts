import { Injectable } from '@angular/core';
import { ApolloAngularSDK } from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class CompanyDetailService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  company(slug: string): any {
    return this.sdk.company({ input: { slug } });
  }
}
