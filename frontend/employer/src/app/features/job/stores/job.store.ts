import { Injectable } from '@angular/core';
import {exhaustMap, switchMap, tap} from 'rxjs/operators';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {EditCompanyInput, EditJobInput, Job} from '../../../../generated/graphql';
import { JobService } from '../services';

interface JobState {
  loading: boolean;
  jobs: Job[];
  totalPages: number;
  totalResults: number;
}

@Injectable({ providedIn: 'root' })
export class JobStore extends ComponentStore<JobState> {
  readonly jobs$ = this.select((s) => s.jobs);
  readonly loading$ = this.select((s) => s.loading);
  readonly totalPages$ = this.select((s) => s.totalPages);
  readonly totalResults$ = this.select((s) => s.totalResults);

  readonly vm$ = this.select(
    this.jobs$, this.loading$, this.totalPages$, this.totalResults$, (jobs, loading, totalPages, totalResults) => ({
      jobs,
      loading,
      totalPages,
      totalResults,
      isEmpty: !jobs.length
    }));

  constructor(private readonly jobService: JobService) {
    super({ loading: false, jobs: [], totalPages: 0, totalResults: 0 });
  }

  readonly getJobsEffect = this.effect<number>((page$) =>
    page$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((page) =>
        this.jobService.jobs(page).pipe(
          tapResponse(({ data }) => {
            if (data?.jobsByCandidate) {
              this.patchState({
                loading: false,
                jobs: data.jobsByCandidate.jobs,
                totalPages: data.jobsByCandidate.totalPages,
                totalResults: data.jobsByCandidate.totalResults
              });
            }
          }, console.error)
        )
      )
    )
  );

  readonly editCompanyEffect = this.effect<EditJobInput>((editJob$) =>
    editJob$.pipe(
      exhaustMap((editJob) => {
          return this.jobService.editJob(editJob).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                jobs: [
                  ...state.jobs.map(job => {
                    if (job.id === editJob.id) {
                      return {
                        ...job,
                        ...editJob
                      };
                    }
                    return job;
                  })
                ]
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly deleteJobEffect = this.effect<number>((id$) =>
    id$.pipe(
      exhaustMap((id) => {
          console.log(id);
          return this.jobService.deleteJob(id).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                jobs: [
                  ...state.jobs.filter(job => job.id !== id)
                ],
                totalResults: state.totalResults - 1,
                totalPages: Math.ceil((state.totalResults - 1) / 2)
              }));
            }, console.error)
          );
        }
      )
    )
  );
}
