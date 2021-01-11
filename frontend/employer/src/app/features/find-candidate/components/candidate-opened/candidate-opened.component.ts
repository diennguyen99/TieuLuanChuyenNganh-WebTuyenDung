import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ViewCvModalComponent} from '../view-cv-modal/view-cv-modal.component';

@Component({
  selector: 'app-candidate-opened',
  templateUrl: './candidate-opened.component.html',
  styleUrls: ['./candidate-opened.component.scss']
})
export class CandidateOpenedComponent implements OnInit {

  constructor(
    private readonly modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  openViewCVModal(): void {
    this.modalService.create({
      nzContent: ViewCvModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700
    });
  }
}
