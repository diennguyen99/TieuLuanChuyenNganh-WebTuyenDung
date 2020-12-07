import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule)
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
