import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CompanyStore } from './stores';
import {
  AddLogoModalComponent,
  AddThumbnailModalComponent,
  FormUpdateCompanyComponent
} from './components';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  readonly vm$ = this.companyStore.vm$;

  constructor(
    private readonly companyStore: CompanyStore,
    private readonly modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.companyStore.getCompanyEffect();
  }

  openModalUpdateCompany(company): void {
    this.modalService.create({
      nzTitle: 'Update Company',
      nzContent: FormUpdateCompanyComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
      nzComponentParams: {
        company
      }
    });
  }

  openModalAddLogo(companyId): void {
    this.modalService.create({
      nzTitle: 'Logo',
      nzContent: AddLogoModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
      nzComponentParams: {
        companyId
      }
    });
  }

  openModalAddThumbnail(companyId): void {
    this.modalService.create({
      nzTitle: 'Thumbnail',
      nzContent: AddThumbnailModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
      nzComponentParams: {
        companyId
      }
    });
  }
}
