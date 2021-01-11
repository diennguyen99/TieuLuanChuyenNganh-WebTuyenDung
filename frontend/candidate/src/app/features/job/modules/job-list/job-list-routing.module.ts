import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list.component';

const routes: Routes = [
  {
    path: ':name/:city/:jobSector',
    component: JobListComponent
  },
  {
    path: ':city/:jobSector',
    component: JobListComponent
  },
  {
    path: '',
    component: JobListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobListRoutingModule { }
