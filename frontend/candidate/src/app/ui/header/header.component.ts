import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../common/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(
    private readonly authStore: AuthStore
  ) { }

  ngOnInit(): void {
    this.authStore.isAuth$.subscribe((value) => {
      this.isAuth = value;
    });
  }

  logout(): void {
    this.authStore.signOutEffect();
  }
}
