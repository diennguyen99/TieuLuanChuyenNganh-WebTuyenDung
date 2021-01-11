import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { Company } from '../../../../../../generated/graphql';
import { CompanyDetailService } from '../services';

interface CompanyDetailState {
  loading: boolean;
  company: Company;
}

@Injectable()
export class CompanyDetailStore extends ComponentStore<CompanyDetailState> {
  readonly company$ = this.select((s) => s.company);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.company$, this.loading$, (company, loading) => ({
    company,
    loading,
    notFound: !company
  }));

  constructor(
    private readonly companyDetailService: CompanyDetailService
  ) {
    super({ loading: false, company: null });
  }

  readonly getCompanyEffect = this.effect<string>((slug$) =>
    slug$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((slug) =>
        this.companyDetailService.company(slug).pipe(
          tapResponse(({ data: { companyBySlug } }) => {
            this.setState({
              loading: false,
              company: companyBySlug.company
            });
          }, console.error)
        )
      )
    )
  );
}
