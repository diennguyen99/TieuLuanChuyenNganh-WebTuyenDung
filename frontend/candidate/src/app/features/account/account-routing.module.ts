import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile')
          .then(m => m.ProfileModule)
      },
      {
        path: 'resume',
        loadChildren: () => import('./modules/resume')
          .then(m => m.ResumeModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./modules/change-password')
          .then(m => m.ChangePasswordModule)
      },
      {
        path: 'applied-jobs',
        loadChildren: () => import('./modules/applied-jobs')
          .then(m => m.AppliedJobsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
