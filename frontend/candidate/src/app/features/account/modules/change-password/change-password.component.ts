import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordService} from './services/change-password.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly changePasswordService: ChangePasswordService,
    private readonly notificationService: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      enterPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onSubmit(): void {
    this.changePasswordService.changePassword({
      oldPassword: this.form.get('oldPassword').value,
      newPassword: this.form.get('newPassword').value
    }).subscribe(({ data }) => {
      if (data?.changePassword?.ok) {
        this.notificationService.success(
          'Success',
          'Change password success!'
        );
        this.form.reset();
      } else {
        this.notificationService.error(
          'Incorrect',
          data?.changePassword?.error
        );
      }
    });
  }
}
