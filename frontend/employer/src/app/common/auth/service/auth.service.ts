import { Injectable } from '@angular/core';
import { ApolloAngularSDK, CreateAccountInput, LoginInput } from '../../../../generated/graphql';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly sdk: ApolloAngularSDK
  ) {}

  login(loginInput: LoginInput): any {
    return this.sdk.loginMutation({ input: loginInput});
  }

  register(createAccountInput: CreateAccountInput): Observable<any> {
    return this.sdk.createAccount({ input: createAccountInput});
  }
}
