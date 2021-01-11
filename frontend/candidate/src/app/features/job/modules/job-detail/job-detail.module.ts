import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailRoutingModule } from './job-detail-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ControlModule } from '../../../../ui/control';

import { JobDetailComponent } from './job-detail.component';
import { ApplyJobModalComponent } from './components';

@NgModule({
  declarations: [JobDetailComponent, ApplyJobModalComponent],
  imports: [
    CommonModule,
    JobDetailRoutingModule,
    ReactiveFormsModule,
    NzModalModule,
    NzNotificationModule,
    ControlModule,
  ]
})
export class JobDetailModule { }
