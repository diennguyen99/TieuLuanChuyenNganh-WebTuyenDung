import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppliedJobsService } from './services/applied-jobs.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  providers: [AppliedJobsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppliedJobsComponent implements OnInit {

  appliedJobs$;
  currentPage = 1;

  constructor(
    private readonly appliedJobsComponent: AppliedJobsService,
  ) { }

  ngOnInit(): void {
    this.getAppliedJobs();
  }

  onChangeCurrentPage(): void {
    this.getAppliedJobs();
  }

  getAppliedJobs(): void {
    this.appliedJobs$ = this.appliedJobsComponent.appliedJobs(this.currentPage);
  }
}
