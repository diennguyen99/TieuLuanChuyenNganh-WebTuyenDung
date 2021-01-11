import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {ResumeService} from '../../../../shared/services/resume.service';
import {Resume} from '../../../../core/models/resume.model';
import {PaymentService} from '../../../../shared/services/payment.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-view-cv-modal',
  templateUrl: './view-cv-modal.component.html',
  styleUrls: ['./view-cv-modal.component.scss']
})
export class ViewCvModalComponent implements OnInit {

  @Input() id: number;
  resume: Resume;

  constructor(
    private readonly modalRef: NzModalRef,
    private readonly notification: NzNotificationService,
    private readonly resumeService: ResumeService,
    private readonly paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.resumeService.getResumePrivate(this.id).subscribe((response) => {
      this.resume = response.resume;
    });
  }

  onCloseModal(): void {
    this.modalRef.close();
  }

  onSubmit(): void {
    this.paymentService.paymentOpenResume(this.id).subscribe((response) => {
      if (response.ok) {
        this.notification.success(
          'Success',
          'Open resume success!'
        );
      } else {
        this.notification.warning(
          'Warning',
          response.error
        );
      }
      this.modalRef.triggerOk();
      this.onCloseModal();
    });
  }
}
