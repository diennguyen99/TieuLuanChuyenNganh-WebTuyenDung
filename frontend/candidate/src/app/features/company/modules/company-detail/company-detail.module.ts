import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyDetailRoutingModule } from './company-detail-routing.module';
import { CompanyDetailComponent } from './company-detail.component';
import { JobComponent } from './components/job/job.component';


@NgModule({
  declarations: [CompanyDetailComponent, JobComponent],
  imports: [
    CommonModule,
    CompanyDetailRoutingModule
  ]
})
export class CompanyDetailModule { }
