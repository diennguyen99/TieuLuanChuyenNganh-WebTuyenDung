import { Injectable } from '@angular/core';
import { ApolloAngularSDK, UploadCvInput } from '../../../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class ApplyJobService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  applyJob(uploadCv: UploadCvInput): any {
    return this.sdk.applyJob({ input: uploadCv });
  }
}
