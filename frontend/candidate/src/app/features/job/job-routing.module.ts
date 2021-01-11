import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':slug',
        loadChildren: () => import('./modules/job-detail')
          .then(m => m.JobDetailModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/job-list')
          .then(m => m.JobListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
