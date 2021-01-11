import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { JobSectorService } from '../services/job-sector.service';
import { JobSector } from '../../../generated/graphql';

interface JobSectorState {
  loading: boolean;
  jobSectors: JobSector[];
}

@Injectable({ providedIn: 'root' })
export class JobSectorStore extends ComponentStore<JobSectorState> {
  readonly jobSectors$ = this.select((s) => s.jobSectors);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.jobSectors$, this.loading$, (jobSectors, loading) => ({
    jobSectors,
    loading,
    isEmpty: !jobSectors.length
  }));

  constructor(
    private readonly jobSectorService: JobSectorService
  ) {
    super({ loading: false, jobSectors: [] });
  }

  readonly getJobSectorsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.jobSectorService.jobSectors().pipe(
          tapResponse(({ data }) => {
            if (data?.jobSectors) {
              this.patchState({
                loading: false,
                jobSectors: data.jobSectors.results
              });
            }
          }, console.error)
        )
      )
    )
  );
}
