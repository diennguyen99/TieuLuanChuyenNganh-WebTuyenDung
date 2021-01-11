import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layouts';
import { AuthGuard } from './common/guards';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home')
          .then(m => m.HomeModule),
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./features/security')
          .then(m => m.SecurityModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./features/account')
          .then(m => m.AccountModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'jobs',
        loadChildren: () => import('./features/job')
          .then(m => m.JobModule)
      },
      {
        path: 'companies',
        loadChildren: () => import('./features/company')
          .then(m => m.CompanyModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about')
          .then(m => m.AboutModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact')
          .then(m => m.ContactModule)
      },
      {
        path: '404',
        loadChildren: () => import('./features/not-found')
          .then(m => m.NotFoundModule)
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
