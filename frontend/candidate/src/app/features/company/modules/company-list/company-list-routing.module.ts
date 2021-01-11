import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list.component';

const routes: Routes = [
  {
    path: 'query/:nameCompany',
    component: CompanyListComponent
  },
  {
    path: '',
    component: CompanyListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyListRoutingModule { }
