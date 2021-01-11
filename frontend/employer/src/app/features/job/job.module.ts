import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { JobComponent } from './job.component';

import { ListJobComponent } from './containers/list-job/list-job.component';
import { CreateJobComponent } from './containers/create-job/create-job.component';
import { SharedModule } from '../../shared/shared.module';
import { FormJobCreateComponent } from './components/form-job-create/form-job-create.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { SuccessComponent } from './components/success/success.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { FormJobEditComponent } from './components/form-job-edit/form-job-edit.component';
import { JobDeleteComponent } from './components/job-delete/job-delete.component';


export const ROUTES: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      { path: '', component: ListJobComponent },
      { path: 'create', component: CreateJobComponent },
    ]
  }
];


@NgModule({
  declarations: [
    JobComponent,
    CreateJobComponent,
    ListJobComponent,
    FormJobCreateComponent,
    CheckOutComponent,
    SuccessComponent,
    FormJobEditComponent,
    JobDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    NgSelectModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{list: 'ordered'}, {list: 'bullet'}],
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          [{color: []}, {background: []}],
          ['link'],
          ['clean']
        ]
      }
    }),
    NzModalModule,
    NzPaginationModule,
    SharedModule
  ]
})
export class JobModule { }
