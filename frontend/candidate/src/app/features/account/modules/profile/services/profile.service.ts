import { Injectable } from '@angular/core';
import { ApolloAngularSDK, EditProfileInput } from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  profile(): any {
    return this.sdk.profile();
  }

  editProfile(editProfileInput: EditProfileInput): any {
    return this.sdk.editProfile({ input: editProfileInput });
  }
}
