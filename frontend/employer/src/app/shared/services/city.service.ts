import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

import { OutputBase } from '../../core/models/output.model';
import { City } from '../../core/models/city.model';


export const citiesQuery = gql`
  query {
    allCities {
      ok
      error
      cities {
        name
        slug
      }
    }
  }
`;

interface Cities extends OutputBase {
  cities: City[];
}

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getCities(): Observable<ApolloQueryResult<{ allCities: Cities }>> {
    return this.apollo
      .query({
        query: citiesQuery
      });
  }
}
