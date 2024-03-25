import { Injectable, inject, signal } from '@angular/core';

import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MyCountriesService {
  private readonly firestore = inject(Firestore);

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
