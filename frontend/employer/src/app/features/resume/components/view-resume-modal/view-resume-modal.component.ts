import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SendMailModalComponent } from '../send-mail-modal/send-mail-modal.component';
import { ChangeStatusModalComponent } from '../change-status-modal/change-status-modal.component';
import { ChangeResumeTypeComponent } from '../change-resume-type/change-resume-type.component';

@Component({
  selector: 'app-view-resume-modal',
  templateUrl: './view-resume-modal.component.html',
  styleUrls: ['./view-resume-modal.component.scss']
})
export class ViewResumeModalComponent implements OnInit {

  constructor(
    private readonly modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  openChangeStatusModal(): void {
    this.modalService.create({
      nzContent: ChangeStatusModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 600
    });
  }

  openChangeResumeTypeModal(): void {
    this.modalService.create({
      nzContent: ChangeResumeTypeComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 600
    });
  }

  openSendMailModal(): void {
    this.modalService.create({
      nzContent: SendMailModalComponent,
      nzTitle: 'Confirm email for the candidate',
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700
    });
  }
}
