import { Injectable } from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Company, EditCompanyInput, EditLogoInput, EditThumbnailInput} from '../../../../generated/graphql';
import { CompanyService } from '../services';
import {exhaustMap, switchMap, tap} from 'rxjs/operators';

interface CompanyState {
  loading: boolean;
  company: Company;
}

@Injectable({ providedIn: 'root' })
export class CompanyStore extends ComponentStore<CompanyState> {
  readonly company$ = this.select((s) => s.company);
  readonly loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.company$, this.loading$, (company, loading) => ({
    company,
    loading
  }));

  constructor(private readonly companyService: CompanyService) {
    super({ loading: false, company: null });
  }

  readonly getCompanyEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.companyService.company().pipe(
          tapResponse(({ data }) => {
            if (data?.companyByEmployer) {
              this.patchState({
                loading: false,
                company: data.companyByEmployer.company
              });
            }
          }, console.error)
        )
      )
    )
  );

  readonly editCompanyEffect = this.effect<EditCompanyInput>((editCompany$) =>
    editCompany$.pipe(
      exhaustMap((editCompany) => {
          return this.companyService.editCompany(editCompany).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                company: {
                  ...state.company,
                  ...editCompany
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editLogoCompanyEffect = this.effect<EditLogoInput>((editLogo$) =>
    editLogo$.pipe(
      exhaustMap(({ id, base64Logo }) => {
          this.patchState((state) => ({
            company: {
              ...state.company,
              logo: base64Logo
            }
          }));
          return this.companyService.editLogoCompany(id, base64Logo).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                company: {
                  ...state.company,
                  logo: base64Logo
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );

  readonly editThumbnailCompanyEffect = this.effect<EditThumbnailInput>((editThumbnail$) =>
    editThumbnail$.pipe(
      exhaustMap(({ id, base64Thumbnail }) => {
          this.patchState((state) => ({
            company: {
              ...state.company,
              thumbnail: base64Thumbnail
            }
          }));
          return this.companyService.editThumbnailCompany(id, base64Thumbnail).pipe(
            tapResponse(() => {
              this.patchState((state) => ({
                company: {
                  ...state.company,
                  thumbnail: base64Thumbnail
                }
              }));
            }, console.error)
          );
        }
      )
    )
  );
}
