import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { JobStore } from '../../stores';

@Component({
  selector: 'app-job-delete',
  templateUrl: './job-delete.component.html',
  styleUrls: ['./job-delete.component.scss']
})
export class JobDeleteComponent {

  @Input() jobId: number;

  constructor(
    private readonly modalRef: NzModalRef,
    private readonly jobStore: JobStore
  ) { }

  onSubmit(): void {
    this.jobStore.deleteJobEffect(this.jobId);
    this.modalRef.close();
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
