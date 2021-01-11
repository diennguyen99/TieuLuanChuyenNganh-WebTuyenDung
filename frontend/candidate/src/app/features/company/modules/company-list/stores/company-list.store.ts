import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';

import { Company, SearchCompaniesInput } from '../../../../../../generated/graphql';
import { CompanyListService } from '../services';

interface CompanyListState {
  loading: boolean;
  totalPages: number;
  totalResults: number;
  results: Company[];
}

@Injectable()
export class CompanyListStore extends ComponentStore<CompanyListState> {
  readonly results$ = this.select((s) => s.results);
  readonly totalPages$ = this.select((s) => s.totalPages);
  readonly totalResults$ = this.select((s) => s.totalResults);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(
    this.results$, this.totalPages$, this.totalResults$, this.loading$, (results, totalPages, totalResults, loading) => ({
      results,
      totalPages,
      totalResults,
      loading,
      isEmpty: !results.length
    }));

  constructor(
    private readonly companyListService: CompanyListService
  ) {
    super({ loading: false, totalPages: 0, totalResults: 0, results: [] });
  }

  readonly filterCompanyEffect = this.effect<SearchCompaniesInput>((searchCompanyParams$) =>
    searchCompanyParams$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(({ nameCompany, page }) =>
        this.companyListService.filterCompany({ nameCompany, page }).pipe(
          tapResponse(({ data }) => {
            if (data?.searchCompanies) {
              this.patchState({
                loading: false,
                results: data.searchCompanies.companies,
                totalPages: data.searchCompanies.totalPages,
                totalResults: data.searchCompanies.totalResults,
              });
            }
          }, console.error)
        )
      )
    )
  );
}
