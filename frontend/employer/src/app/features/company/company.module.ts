import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../../shared/shared.module';

import {CompanyComponent} from './company.component';
import {
  AddLogoModalComponent,
  FormUpdateCompanyComponent
} from './components';
import { AddThumbnailModalComponent } from './components/add-thumbnail-modal/add-thumbnail-modal.component';


@NgModule({
  declarations: [
    CompanyComponent,
    FormUpdateCompanyComponent,
    AddLogoModalComponent,
    AddThumbnailModalComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    NzModalModule,
    NgSelectModule,
    ImageCropperModule,
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
    SharedModule
  ]
})
export class CompanyModule { }
