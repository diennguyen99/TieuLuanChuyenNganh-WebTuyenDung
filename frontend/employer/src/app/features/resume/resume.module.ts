import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';

import { ResumeComponent } from './resume.component';
import { ResumeTypeComponent } from './containers/resume-type/resume-type.component';
import { ViewResumeModalComponent } from './components/view-resume-modal/view-resume-modal.component';
import { ChangeStatusModalComponent } from './components/change-status-modal/change-status-modal.component';
import { ChangeResumeTypeComponent } from './components/change-resume-type/change-resume-type.component';
import { SendMailModalComponent } from './components/send-mail-modal/send-mail-modal.component';
import { CandidateAppiledComponent } from './containers/candidate-appiled/candidate-appiled.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ResumeComponent,
    children: [
      {
        path: ':id',
        component: ResumeTypeComponent,
      },
      {
        path: 'candidate-applied',
        component: CandidateAppiledComponent,
      },
      {
        path: '',
        component: ResumeTypeComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ResumeTypeComponent,
    ResumeComponent,
    ViewResumeModalComponent,
    ChangeStatusModalComponent,
    ChangeResumeTypeComponent,
    SendMailModalComponent,
    CandidateAppiledComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzModalModule,
    NgSelectModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['link'],
          ['clean']
        ]
      }
    })
  ],
})
export class ResumeModule { }
