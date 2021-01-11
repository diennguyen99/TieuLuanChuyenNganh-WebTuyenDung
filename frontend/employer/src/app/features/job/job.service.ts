import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {createJobMutation, deleteJobMutation, editJobMutation, jobQuery, jobsQuery} from './job.graphql';
import { OutputBase } from '../../core/models/output.model';
import { Job } from './job.model';
import { map } from 'rxjs/operators';

interface CreateJobOutput extends OutputBase {
  jobId: number;
}

export interface Jobs extends OutputBase {
  jobs: Job[];
  totalPages: number;
  totalResults: number;
}

export interface JobResponse extends OutputBase {
  job: Job;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  newJobId = new BehaviorSubject<number>(null);

  constructor(
    private readonly apollo: Apollo
  ) { }

  createJob(dataInput): Observable<FetchResult<{ createJob: CreateJobOutput }>> {
    return this.apollo
      .mutate({
        mutation: createJobMutation,
        variables: dataInput
      });
  }

  getJobs(page): Observable<Jobs> {
    return this.apollo
      .query<any>({
        query: jobsQuery,
        variables: {
          page
        },
      })
      .pipe(
        map(({ data }) => data.jobsByCandidate)
      );
  }

  getJob(id: number): Observable<ApolloQueryResult<{ job: JobResponse }>> {
    return this.apollo
      .query<{ job: JobResponse }>({
        query: jobQuery,
        variables: {
          id
        },
      });
  }

  editJob(dataInput): Observable<OutputBase> {
    return this.apollo
      .mutate<any>({
        mutation: editJobMutation,
        variables: dataInput,
      })
      .pipe(
        map((result) => result.data.editJob)
      );
  }

  deleteJob(id): Observable<any> {
    return this.apollo
      .mutate({
        mutation: deleteJobMutation,
        variables: {
          id
        }
      });
  }
}
