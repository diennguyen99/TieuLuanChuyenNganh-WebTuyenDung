import { Injectable } from '@angular/core';
import {ApolloAngularSDK, SearchCompaniesInput} from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class CompanyListService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  filterCompany(searchCompaniesInput: SearchCompaniesInput): any {
    return this.sdk.filterCompany({ input: searchCompaniesInput });
  }
}
