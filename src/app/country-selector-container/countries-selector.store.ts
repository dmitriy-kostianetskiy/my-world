import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Country } from '../model/country';
import { WORLD } from '../world';

type CountriesSelectorState = {
  searchTerm: string;
};

const initialState: CountriesSelectorState = {
  searchTerm: '',
};

function match(country: Country, searchTerm: string): boolean {
  const term = searchTerm.toLowerCase();
  const name = country.properties.name.toLowerCase();
  const id = country.id.toLowerCase();

  return name.includes(term) || id.includes(term);
}

export const CountriesSelectorStore = signalStore(
  withState(initialState),
  withComputed(({ searchTerm }) => ({
    searchResults: computed(() => WORLD.filter(country => match(country, searchTerm()))),
  })),
  withMethods(store => ({
    setSearchTerm(searchTerm: string): void {
      patchState(store, () => ({ searchTerm }));
    },
  })),
);
