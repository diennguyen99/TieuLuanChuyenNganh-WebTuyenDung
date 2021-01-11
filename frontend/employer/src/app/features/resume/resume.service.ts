import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {appliedJobsQuery, resumesOpenNewQuery} from './resume.graphql';
import {map} from 'rxjs/operators';
import {OutputBase} from '../../core/models/output.model';
import {User} from '../../core/models/user.model';
import {Resume} from '../../core/models/resume.model';

interface ResumesOpenNewResponse extends OutputBase {
  resumesOpen: [{
    createdAt: Date,
    user: User,
    resume: Resume
  }];
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getResumesOpenNew(): Observable<ResumesOpenNewResponse> {
    return this.apollo
      .query<any>({
        query: resumesOpenNewQuery
      })
      .pipe(
        map((result) => result.data.resumesOpenNew)
      );
  }

  getAppliedJobs(page): Observable<any> {
    return this.apollo
      .query<any>({
        query: appliedJobsQuery,
        variables: { page }
      })
      .pipe(
        map((result) => result.data.getCandidatesApply)
      );
  }
}
