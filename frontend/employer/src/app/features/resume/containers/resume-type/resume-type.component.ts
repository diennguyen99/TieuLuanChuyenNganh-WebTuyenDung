import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ViewResumeModalComponent } from '../../components/view-resume-modal/view-resume-modal.component';
import { ResumeService } from '../../resume.service';
import { ResumeTypesStore } from '../../stores/resume-types.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume-type',
  templateUrl: './resume-type.component.html',
  styleUrls: ['./resume-type.component.scss']
})
export class ResumeTypeComponent implements OnInit {

  readonly resumeTypesVm$ = this.resumeTypes.vm$;
  resumes: any;
  idResumeType: number = null;

  constructor(
    private readonly modalService: NzModalService,
    private readonly resumeService: ResumeService,
    private readonly resumeTypes: ResumeTypesStore,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params?.id) {
        this.idResumeType = params.id;
      }
    });
    this.resumeTypes.getResumeTypesEffect();
    this.resumeService.getResumesOpenNew().subscribe((response) => {
      this.resumes = response.resumesOpen;
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

  getResumes(): void {
    console.log('resume');
  }
}
