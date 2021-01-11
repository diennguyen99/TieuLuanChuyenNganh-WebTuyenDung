import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormJobEditComponent } from '../../components/form-job-edit/form-job-edit.component';
import { JobDeleteComponent } from '../../components/job-delete/job-delete.component';
import { JobStore } from '../../stores';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.scss']
})
export class ListJobComponent implements OnInit {

  readonly vm$ = this.jobStore.vm$;
  currentPage = 1;
  private dateNow = new Date();

  constructor(
    private readonly modalService: NzModalService,
    private jobStore: JobStore
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  changePageIndex(): void {
    this.getJobs();
  }

  onResetPage(page: number = 1): void {
    this.currentPage = page;
    this.getJobs();
  }

  getJobs(): void {
    this.jobStore.getJobsEffect(this.currentPage);
  }

  openModalEditJob(job): void {
    this.modalService.create({
      nzTitle: 'Edit Job',
      nzContent: FormJobEditComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 1000,
      nzComponentParams: {
        job
      },
    });
  }

  openModalDeleteJob(id: number): void {
    this.modalService.create({
      nzTitle: 'Delete Job',
      nzContent: JobDeleteComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 400,
      nzOnOk: () => this.onResetPage(),
      nzComponentParams: {
        jobId: id
      }
    });
  }

  // openModalAddPayment(id: number): void {
  //   this.modalService.create({
  //     nzTitle: 'Payment',
  //     nzContent: CheckOutComponent,
  //     nzClosable: false,
  //     nzFooter: null,
  //     nzWidth: 700,
  //   });
  // }

  checkPromotedUntil(promotedUntil: Date): { status: boolean, error?: string } {
    if (!promotedUntil) {
      return {
        status: false,
        error: 'Not Payment'
      };
    }


    if (new Date(promotedUntil) < this.dateNow) {
      return {
        status: false,
        error: 'Expired'
      };
    }

    return {
      status: true
    };
  }

  totalItemPerPage(totalResults: number, totalPages: number): any {
    return Math.ceil(totalResults / totalPages);
  }
}
