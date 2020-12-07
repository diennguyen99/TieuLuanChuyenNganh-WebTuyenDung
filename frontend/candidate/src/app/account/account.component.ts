import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  jobSearchStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(): void {
    console.log(this.jobSearchStatus);
  }
}
