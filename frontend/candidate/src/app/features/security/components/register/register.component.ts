import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../common/auth';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';
import {UserRole} from '../../../../../generated/graphql';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NzNotificationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      passwordConfirmation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.register({
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: UserRole.Candidate,
    }).subscribe(({ data: { createAccount }}) => {
      if (createAccount.ok) {
        this.notificationService.success(
          'Success',
          'Register account success'
        );
        this.router.navigate(['/login']);
      } else {
        this.notificationService.error(
          'Error',
          createAccount.error
        );
      }
    });
  }
}
