import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';

import {Job} from '../../../../../../generated/graphql';
import {JobDetailService} from '../services';

interface JobDetailState {
  loading: boolean;
  job: Job;
}

@Injectable()
export class JobDetailStore extends ComponentStore<JobDetailState> {
  readonly job$ = this.select((s) => s.job);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.job$, this.loading$, (job, loading) => ({
    job,
    loading,
    notFound: !job
  }));

  constructor(
    private readonly jobDetailService: JobDetailService
  ) {
    super({ loading: false, job: null });
  }

  readonly getJobEffect = this.effect<string>((slug$) =>
    slug$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((slug) =>
        this.jobDetailService.job(slug).pipe(
          tapResponse(({ data: { jobBySlug } }) => {
            this.setState({
              loading: false,
              job: jobBySlug.job
            });
          }, console.error)
        )
      )
    )
  );
}
