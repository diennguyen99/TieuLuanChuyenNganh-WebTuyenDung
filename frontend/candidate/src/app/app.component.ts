import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private readonly authService: AuthService) {
    this.authService.isAuthenticated.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
