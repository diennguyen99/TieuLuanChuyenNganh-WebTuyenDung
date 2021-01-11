import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

// containers
import { PackageComponent} from './containers/package/package.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import {SharedModule} from '../../shared/shared.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: PackageComponent
  }
];

@NgModule({
  declarations: [
    PackageComponent,
    PaymentModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzModalModule,
    SharedModule,
  ]
})
export class PackageModule { }
