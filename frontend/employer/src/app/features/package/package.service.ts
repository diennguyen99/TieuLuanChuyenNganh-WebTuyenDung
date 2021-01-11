import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

import { OutputBase } from '../../core/models/output.model';
import { Pkage } from './package.model';
import { packagesQuery } from './package.graphql';

interface Packages extends OutputBase {
  results?: Pkage[];
}

interface GetPackagesResponse {
  packages: Packages;
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getPackages(): Observable<ApolloQueryResult<GetPackagesResponse>> {
    return this.apollo
      .watchQuery<GetPackagesResponse>({
        query: packagesQuery
      }).valueChanges;
  }
}
