import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { JobTypeService } from '../services/job-type.service';
import { JobType } from '../../../generated/graphql';

interface JobTypeState {
  loading: boolean;
  jobTypes: JobType[];
}

@Injectable({ providedIn: 'root' })
export class JobTypeStore extends ComponentStore<JobTypeState> {
  readonly jobTypes$ = this.select((s) => s.jobTypes);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.jobTypes$, this.loading$, (jobTypes, loading) => ({
    jobTypes,
    loading,
    isEmpty: !jobTypes.length
  }));

  constructor(
    private readonly jobTypeService: JobTypeService
  ) {
    super({ loading: false, jobTypes: [] });
  }

  readonly getJobTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.jobTypeService.jobTypes().pipe(
          tapResponse(({ data }) => {
            if (data?.jobTypes) {
              this.patchState({
                loading: false,
                jobTypes: data.jobTypes.results
              });
            }
          }, console.error)
        )
      )
    )
  );
}
