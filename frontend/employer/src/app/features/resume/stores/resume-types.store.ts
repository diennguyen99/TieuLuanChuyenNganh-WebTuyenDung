import { ResumeType } from '../../../../generated/graphql';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import { ResumeTypesService } from '../services';
import {switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

interface ResumeTypesState {
  loading: boolean;
  resumeTypes: ResumeType[];
}

@Injectable({ providedIn: 'root' })
export class ResumeTypesStore extends ComponentStore<ResumeTypesState>{
  resumeTypes$ = this.select((s) => s.resumeTypes);
  loading$ = this.select((s) => s.loading);

  readonly vm$ = this.select(this.resumeTypes$, this.loading$, (resumeTypes, loading) => ({
    resumeTypes,
    loading
  }));

  constructor(private readonly resumeTypesService: ResumeTypesService) {
    super({ loading: false, resumeTypes: [] });
  }

  readonly getResumeTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.resumeTypesService.resumeTypes().pipe(
          tapResponse(({ data }) => {
            if (data?.resumeTypes) {
              this.patchState({
                loading: false,
                resumeTypes: data.resumeTypes.resumeTypes
              });
            }
          }, console.error)
        )
      )
    )
  );
}
