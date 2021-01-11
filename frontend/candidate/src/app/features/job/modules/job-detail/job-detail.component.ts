import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDetailStore } from './stores';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ApplyJobModalComponent} from './components';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
  providers: [JobDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobDetailComponent implements OnInit {

  readonly vm$ = this.jobDetailStore.vm$;

  slug: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly jobDetailStore: JobDetailStore,
    private readonly modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ slug }) => {
      this.slug = slug;
      this.jobDetailStore.getJobEffect(slug);
    });
  }

  openApplyJobModal(): void {
    this.modalService.create({
      nzTitle: 'Apply Job',
      nzContent: ApplyJobModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 600,
      nzComponentParams: {
        jobSlug: this.slug
      }
    });
  }
}
