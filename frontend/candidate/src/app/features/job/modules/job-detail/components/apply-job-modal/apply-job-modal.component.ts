import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthStore} from '../../../../../../common/auth';
import {ApplyJobService} from '../../services';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-apply-job-modal',
  templateUrl: './apply-job-modal.component.html',
  styleUrls: ['./apply-job-modal.component.scss']
})
export class ApplyJobModalComponent implements OnInit {

  @Input() jobSlug;
  form: FormGroup;
  isLoggedIn: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authStore: AuthStore,
    private readonly applyJobService: ApplyJobService,
    private readonly modalRef: NzModalRef,
    private readonly notificationService: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.authStore.isAuth$.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      file: [null],
      myCvOnline: [false],
      content: null,
      jobSlug: [this.jobSlug, Validators.required]
    });
  }

  onSubmit(): void {
    this.applyJobService.applyJob(this.form.value).subscribe(({ data: { uploadCv }}) => {
      if (uploadCv.ok) {
        this.notificationService.success(
          'Success',
          'Apply Job Success!'
        );
      } else {
        this.notificationService.error(
          'Error',
          'Apply Job Fail!'
        );
      }
      this.modalRef.close();
    });
  }
}
