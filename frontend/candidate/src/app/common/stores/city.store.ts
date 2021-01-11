import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { City } from '../../../generated/graphql';
import { CityService } from '../services/city.service';

interface CityState {
  loading: boolean;
  cities: City[];
}

@Injectable({ providedIn: 'root' })
export class CityStore extends ComponentStore<CityState> {
  readonly cities$ = this.select(s => s.cities);
  readonly loading$ = this.select(s => s.loading);

  readonly vm$ = this.select(this.cities$, this.loading$, (cities, loading) => ({
    cities,
    loading,
    isEmpty: !cities.length
  }));

  constructor(
    private readonly cityService: CityService
  ) {
    super({ loading: false, cities: [] });
  }

  readonly getCitiesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.cityService.cities().pipe(
          tapResponse(({ data }) => {
            if (data?.allCities) {
              this.patchState({
                loading: false,
                cities: data.allCities.cities
              });
            }
          }, console.error)
        )
      )
    )
  );
}
