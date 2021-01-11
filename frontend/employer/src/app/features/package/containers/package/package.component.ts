import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {PaymentModalComponent} from '../../components/payment-modal/payment-modal.component';
import {PackageService} from '../../package.service';
import {Pkage} from '../../package.model';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  packages: Pkage[] = [];
  loading = true;

  constructor(
    private readonly modalService: NzModalService,
    private readonly packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe(({ data, loading }) => {
      if (data.packages.ok) {
        this.packages = data.packages.results;
      } else {
        console.log('Load packages error!');
      }
      this.loading = loading;
    });
  }

  openPaymentModal(): void {
    this.modalService.create({
      nzContent: PaymentModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700
    });
  }
}
