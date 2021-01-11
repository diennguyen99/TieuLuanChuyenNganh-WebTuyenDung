import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyListStore } from './stores';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  providers: [CompanyListStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent implements OnInit {

  readonly vm$ = this.companyListStore.vm$;

  currentPage = 1;
  params;

  constructor(
    private readonly companyListStore: CompanyListStore,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.params = params;
      this.getCompanies(params);
    });
  }

  getCompanies(params = this.params): void {
    this.companyListStore.filterCompanyEffect({
      nameCompany: params?.nameCompany ? params.nameCompany : '',
      page: this.currentPage
    });
  }

  pageSize(totalPages: number, totalResults: number): number {
    return Math.ceil(totalResults / totalPages);
  }

  onChangeCurrentPage(): void {
    this.getCompanies();
  }
}
