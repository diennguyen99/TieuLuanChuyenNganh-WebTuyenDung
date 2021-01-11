import { Injectable } from '@angular/core';
import { Job, SearchJobsInput } from '../../../../../../generated/graphql';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { JobListService } from '../services';
import { switchMap, tap } from 'rxjs/operators';

interface JobListState {
  loading: boolean;
  totalPages: number;
  totalResults: number;
  results: Job[];
}

@Injectable()
export class JobListStore extends ComponentStore<JobListState> {
  readonly results$ = this.select((s) => s.results);
  readonly totalPages$ = this.select((s) => s.totalPages);
  readonly totalResults$ = this.select((s) => s.totalResults);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(
    this.results$, this.loading$, this.totalPages$, this.totalResults$, (results, loading, totalPages, totalResults) => ({
      results,
      loading,
      totalPages,
      totalResults,
    isEmpty: !results.length
  }));

  constructor(
    private readonly jobListService: JobListService
  ) {
    super({ loading: false, results: [], totalPages: 0, totalResults: 0 });
  }

  readonly filterJobEffect = this.effect<SearchJobsInput>((searchJobParams$) =>
    searchJobParams$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ page, name, citySlug, jobSectorSlug, jobTypeSlug }) =>
        this.jobListService.filterJob({ page, name, citySlug, jobSectorSlug, jobTypeSlug }).pipe(
          tapResponse(({ data }) => {
            if (data?.searchJobs) {
              this.patchState({
                loading: false,
                results: data.searchJobs.jobs,
                totalPages: data.searchJobs.totalPages,
                totalResults: data.searchJobs.totalResults,
              });
            }
          }, console.error)
        )
      )
    )
  );
}
