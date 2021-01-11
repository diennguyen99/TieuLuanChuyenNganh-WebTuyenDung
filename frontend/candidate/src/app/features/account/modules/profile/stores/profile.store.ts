import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {exhaustMap, switchMap, tap} from 'rxjs/operators';

import {EditProfileInput, User} from '../../../../../../generated/graphql';
import { ProfileService } from '../services';
import {NzNotificationService} from 'ng-zorro-antd/notification';

interface ProfileState {
  loading: boolean;
  profile: User;
}

@Injectable()
export class ProfileStore extends ComponentStore<ProfileState> {
  readonly profile$ = this.select((s) => s.profile);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.profile$, this.loading$, (profile, loading) => ({
    profile,
    loading,
    notFound: !profile
  }));

  constructor(
    private readonly profileService: ProfileService,
    private readonly notificationService: NzNotificationService
  ) {
    super({ loading: false, profile: null });
  }

  readonly getProfileEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.profileService.profile().pipe(
          tapResponse(({ data: { me } }) => {
            this.patchState({
              loading: false,
              profile: me
            });
          }, console.error)
        )
      )
    )
  );

  readonly editProfileEffect = this.effect<EditProfileInput>((editProfile$) =>
    editProfile$.pipe(
      exhaustMap((editProfile) => {
          return this.profileService.editProfile(editProfile).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                profile: {
                  ...state.profile,
                  editProfile
                }
              }));
              this.notificationService.success(
                'Success',
                'Update Profile Success!'
              );
            }, () => this.notificationService.error(
              'Error',
              'An error has occurred. Please come back later!'
            ))
          );
        }
      )
    )
  );
}
