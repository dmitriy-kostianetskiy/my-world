import { Injectable, signal } from '@angular/core';

import { Country } from '../model/country';

@Injectable({
  providedIn: 'root',
})
export class MyCountriesService {
  private readonly rawSelectedCountries = signal<string[]>(['BRA']);

  readonly selectedCountryIds = this.rawSelectedCountries.asReadonly();

  has(countryId: string): boolean {
    return this.rawSelectedCountries().includes(countryId);
  }

  add(countryId: string) {
    this.rawSelectedCountries.update((value) => [
      ...new Set([...value, countryId]),
    ]);
  }

  remove(countryId: string) {
    this.rawSelectedCountries.update((value) =>
      value.filter((item) => item !== countryId)
    );
  }
}
