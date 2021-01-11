import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobListStore } from './stores';
import { JobTypeStore } from '../../../../common/stores';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  providers: [JobListStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent implements OnInit {

  readonly vm$ = this.jobListStore.vm$;
  readonly jobTypeVm$ = this.jobTypeStore.vm$;

  currentPage = 1;
  params;
  jobType: string;

  constructor(
    private readonly jobListStore: JobListStore,
    private readonly jobTypeStore: JobTypeStore,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.jobTypeStore.getJobTypesEffect();
    this.route.params.subscribe((params) => {
      this.params = params;
      this.getJobs(params);
    });
  }

  private getJobs(params = this.params): void {
    this.jobListStore.filterJobEffect({
      page: this.currentPage,
      name: params?.name,
      jobSectorSlug: params?.jobSector,
      citySlug: params?.city,
      jobTypeSlug: this.jobType
    });
  }

  pageSize(totalPages: number, totalResults: number): number {
    return Math.ceil(totalResults / totalPages);
  }

  onChangeCurrentPage(): void {
    this.getJobs();
  }

  onChangeJobType(value: string): void {
    this.jobType = value;
    this.getJobs();
  }
}
