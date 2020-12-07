import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private router: Router,
    private notificationService: NzNotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required
        ])
      },
    );
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.register(this.authForm.value).subscribe(response => {
      const data = response.data.createAccount;
      if (data.ok) {
        this.router.navigate(['login']);
        this.notificationService.create(
          'success',
          'Register Account Success',
          'Check email to activate your account',
          { nzPlacement: 'topLeft' }
        );
      } else {
        this.notificationService.create(
          'error',
          'Register Account Error',
          data.error,
          { nzPlacement: 'topLeft' }
        );
      }
    });
  }
}
