import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppliedJobsRoutingModule } from './applied-jobs-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PipesModule } from '../../../../ui/pipes';

import { AppliedJobsComponent } from './applied-jobs.component';

@NgModule({
  declarations: [AppliedJobsComponent],
  imports: [
    CommonModule,
    AppliedJobsRoutingModule,
    NzPaginationModule,
    PipesModule
  ]
})
export class AppliedJobsModule { }
