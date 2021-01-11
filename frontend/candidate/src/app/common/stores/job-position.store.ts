import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { JobPositionService } from '../services/job-position.service';
import { JobPosition } from '../../../generated/graphql';

interface JobPositionState {
  loading: boolean;
  jobPositions: JobPosition[];
}

@Injectable({ providedIn: 'root' })
export class JobPositionStore extends ComponentStore<JobPositionState> {
  readonly jobPosition$ = this.select((s) => s.jobPositions);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.jobPosition$, this.loading$, (jobPosition, loading) => ({
    jobPosition,
    loading,
    isEmpty: !jobPosition.length
  }));

  constructor(
    private readonly jobPositionService: JobPositionService
  ) {
    super({ loading: false, jobPositions: [] });
  }

  readonly getJobPositionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.jobPositionService.jobPositions().pipe(
          tapResponse(({ data }) => {
            if (data?.jobPositions) {
              this.patchState({
                loading: false,
                jobPositions: data.jobPositions.results
              });
            }
          }, console.error)
        )
      )
    )
  );
}
