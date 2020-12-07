import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {FetchResult} from '@apollo/client/core';

enum UserRole {
  Candidate= 'Candidate',
  Employer= 'Employer',
  Admin= 'Admin'
}

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;


const register = gql`
  mutation createAccount($name: String!, $email: String!, $password: String!, $role: UserRole!) {
    createAccount(input: { name: $name, email: $email, password: $password, role: $role }) {
      ok
      error
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private apollo: Apollo) {
    if (localStorage.getItem('token')) {
      this.isAuthenticated.next(true);
    }
    else {
      this.isAuthenticated.next(false);
    }
  }

  login({ email, password }): Observable<FetchResult<{ login: {ok: boolean; error?: string; token?: string} }>> {
    return this.apollo
      .mutate({
        mutation: login,
        variables: { email, password }
      });
  }

  register({ name, email, password }): Observable<FetchResult<{ createAccount: {ok: boolean; error?: string} }>> {
    console.log({ name, email, password });
    return this.apollo
      .mutate({
        mutation: register,
        variables: { name, email, password, role: UserRole.Candidate },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    window.location.href = '/';
  }
}
