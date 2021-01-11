import { Component, OnInit } from '@angular/core';
import {ResumeService} from '../../resume.service';
import {ViewResumeModalComponent} from '../../components/view-resume-modal/view-resume-modal.component';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-candidate-appiled',
  templateUrl: './candidate-appiled.component.html',
  styleUrls: ['./candidate-appiled.component.scss']
})
export class CandidateAppiledComponent implements OnInit {

  candidates: Array<any>;

  constructor(
    private readonly modalService: NzModalService,
    private readonly resumeService: ResumeService
  ) { }

  ngOnInit(): void {
    this.resumeService.getAppliedJobs(1).subscribe(response => {
      this.candidates = response.appliedJobs;
    });
  }

  openResumeModal(): void {
    this.modalService.create({
      nzContent: ViewResumeModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 1000
    });
  }
}
