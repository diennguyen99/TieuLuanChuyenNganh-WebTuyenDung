import { Injectable } from '@angular/core';
import {ApolloAngularSDK} from '../../../generated/graphql';

@Injectable({ providedIn: 'root'})
export class CityService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  cities(): any {
    return this.sdk.cities();
  }
}
