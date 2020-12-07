import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../../auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private router: Router,
    private notificationService: NzNotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
        ])
      }
    );
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.login(this.authForm.value).subscribe(response => {
      const data = response.data.login;
      if (data.ok) {
        localStorage.setItem('token', data.token);
        this.authService.isAuthenticated.next(true);
        this.router.navigate(['/']);
        this.notificationService.create(
          'success',
          'Login Success',
          'Welcome to UteRecruitment',
          { nzPlacement: 'topLeft' }
        );
      } else {
        this.notificationService.create(
          'error',
          'Login Fail',
          data.error,
          { nzPlacement: 'topLeft' }
        );
      }
    });
  }
}
