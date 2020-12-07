import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SharedModule } from '../shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './containers/profile/profile.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { ResumeComponent } from './containers/resume/resume.component';
import { AccountComponent } from './account.component';
import { AddEducationModalComponent } from './components/add-education-modal/add-education-modal.component';
import { AddAvatarModalComponent } from './components/add-avatar-modal/add-avatar-modal.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    ResumeComponent,
    AccountComponent,
    AddEducationModalComponent,
    AddAvatarModalComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzModalModule,
    NgSelectModule,
    NzSwitchModule,
    SharedModule,
    FormsModule
  ]
})
export class AccountModule { }
