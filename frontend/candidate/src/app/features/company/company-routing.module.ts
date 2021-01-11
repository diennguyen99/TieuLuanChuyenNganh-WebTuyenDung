import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':slug',
        loadChildren: () => import('./modules/company-detail')
          .then(m => m.CompanyDetailModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/company-list')
          .then(m => m.CompanyListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
