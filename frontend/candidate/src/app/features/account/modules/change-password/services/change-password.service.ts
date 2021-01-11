import { Injectable } from '@angular/core';
import { ApolloAngularSDK, ChangePasswordInput } from '../../../../../../generated/graphql';
import type {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChangePasswordService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  changePassword(changePasswordInput: ChangePasswordInput): Observable<any> {
    return this.sdk.changePassword({ input: changePasswordInput });
  }
}
