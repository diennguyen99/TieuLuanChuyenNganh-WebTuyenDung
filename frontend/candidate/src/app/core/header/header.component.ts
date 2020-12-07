import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuthenticated = false;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {}

  onLogout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.isAuthenticated = false;
  }
}
