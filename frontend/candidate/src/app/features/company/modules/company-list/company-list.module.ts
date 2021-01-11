import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { CompanyListComponent } from './company-list.component';
import { SearchCompanyFormComponent } from './components/search-company-form/search-company-form.component';

@NgModule({
  declarations: [CompanyListComponent, SearchCompanyFormComponent],
  imports: [
    CommonModule,
    CompanyListRoutingModule,
    ReactiveFormsModule,
    NzPaginationModule
  ]
})
export class CompanyListModule { }
