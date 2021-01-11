import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeRoutingModule } from './resume-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ControlModule } from '../../../../ui/control';

import {
  EditAvatarModalComponent,
  EditEducationModalComponent,
  EditExperienceModalComponent,
  EditPortfolioModalComponent,
  EditExpertiseModalComponent,
  EditLanguageModalComponent,
  EditAwardModalComponent
} from './components';

import {
  ResumeComponent,
} from './resume.component';

@NgModule({
  declarations: [
    ResumeComponent,
    EditEducationModalComponent,
    EditExperienceModalComponent,
    EditPortfolioModalComponent,
    EditExpertiseModalComponent,
    EditLanguageModalComponent,
    EditAwardModalComponent,
    EditAvatarModalComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    ReactiveFormsModule,
    NzModalModule,
    ImageCropperModule,
    ControlModule
  ]
})
export class ResumeModule { }
