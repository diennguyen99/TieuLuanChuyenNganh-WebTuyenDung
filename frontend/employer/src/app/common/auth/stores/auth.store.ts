import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../service';
import { LoginInput } from '../../../../generated/graphql';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface AuthState {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NzNotificationService
  ) {
    super({ token: '' });
    this.setInitialAuthState();
    this.localStorageEffect(this.select((s) => s));
  }

  readonly token$ = this.select((s) => s.token);
  readonly isAuth$ = this.select(this.token$, (token) => !!token);

  readonly localStorageEffect = this.effect<AuthState>((state$) =>
    state$.pipe(
      tap<AuthState>(({ token }) => {
        if (!token) {
          localStorage.clear();
        } else {
          localStorage.setItem('token', token);
        }
      })
    )
  );

  readonly signInEffect = this.effect<LoginInput>((loginInput$) =>
    loginInput$.pipe(
      exhaustMap((loginInput) =>
        this.authService.login(loginInput).pipe(
          tapResponse(({ data }) => {
            if (data?.login) {
              if (data.login?.token) {
                this.setState({
                  token: data.login.token
                });
                this.router.navigate(['/']);
                this.notificationService.remove();
                this.notificationService.success('Success', 'Login success!');
              } else {
                this.notificationService.info('Incorrect', 'User or password incorrect!', { nzPlacement: 'topLeft' });
              }
            }
          }, console.error)
        )
      )
    )
  );

  readonly signOutEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.setState({
          token: null
        });
        this.router.navigate(['/login']);
      })
    )
  );

  private setInitialAuthState(): void {
    const token = localStorage.getItem('token') || '';
    if (token) {
      this.setState((state) =>
        token != null
          ? { token }
          : { ...state, token }
      );
    } else {
      this.setState({ token: '' });
    }
  }
}
