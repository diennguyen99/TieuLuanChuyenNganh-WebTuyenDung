import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ControlModule } from '../../../../ui/control';

import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NzNotificationModule,
    ControlModule
  ]
})
export class ProfileModule { }
