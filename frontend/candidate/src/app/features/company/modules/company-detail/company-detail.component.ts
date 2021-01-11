import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyDetailStore } from './stores';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  providers: [CompanyDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent implements OnInit {

  readonly vm$ = this.companyDetailStore.vm$;

  constructor(
    private readonly companyDetailStore: CompanyDetailStore,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ slug }) => {
      this.companyDetailStore.getCompanyEffect(slug);
    });
  }

}
