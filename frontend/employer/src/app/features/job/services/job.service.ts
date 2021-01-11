import { Injectable } from '@angular/core';
import { ApolloAngularSDK, CreateJobInput, EditJobInput } from '../../../../generated/graphql';

@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private readonly sdk: ApolloAngularSDK) {}

  jobs(page: number): any {
    return this.sdk.jobs({ input: { page }});
  }

  job(id: number): any {
    return this.sdk.job({ input: { id }});
  }

  createJob(createJobInput: CreateJobInput): any {
    return this.sdk.createJob({ input: createJobInput });
  }

  editJob(editJobInput: EditJobInput): any {
    return this.sdk.editJob({ input: editJobInput });
  }

  deleteJob(id: number): any {
    return this.sdk.deleteJob({ input: { id } });
  }
}
