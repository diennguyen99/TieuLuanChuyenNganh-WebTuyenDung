import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListRoutingModule } from './job-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PipesModule } from '../../../../ui/pipes';

import { JobListComponent } from './job-list.component';
import { SearchJobFormComponent } from './components/search-job-form/search-job-form.component';


@NgModule({
  declarations: [JobListComponent, SearchJobFormComponent],
  imports: [
    CommonModule,
    JobListRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NzPaginationModule,
    PipesModule
  ]
})
export class JobListModule { }
