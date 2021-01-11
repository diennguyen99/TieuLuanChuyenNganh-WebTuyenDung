import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'company',
    loadChildren: () => import('./features/company')
      .then(m => m.CompanyModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./features/job')
      .then(m => m.JobModule)
  },
  {
    path: 'resumes',
    loadChildren: () => import('./features/resume')
      .then(m => m.ResumeModule)
  },
  {
    path: 'find-candidates',
    loadChildren: () => import('./features/find-candidate')
      .then(m => m.FindCandidateModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./features/package')
      .then(m => m.PackageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
