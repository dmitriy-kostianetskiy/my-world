import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { WORLD } from '../world';

export type CountrySelectorItem = {
  id: string;
  name: string;
};

type RawCountrySelectorItem = {
  id: string;
  name: string;
  lowerCaseName: string;
  lowerCaseId: string;
};

type CountriesSelectorState = {
  searchTerm: string;
};

const initialState: CountriesSelectorState = {
  searchTerm: '',
};

const countrySelectorItems: RawCountrySelectorItem[] = WORLD.map(item => ({
  id: item.id,
  name: item.properties.name,
  lowerCaseId: item.id.toLowerCase(),
  lowerCaseName: item.properties.name.toLowerCase(),
}));

function match(
  { lowerCaseName, lowerCaseId }: RawCountrySelectorItem,
  searchTerm: string,
): boolean {
  return lowerCaseName.includes(searchTerm) || lowerCaseId.includes(searchTerm);
}

function search(searchTerm: string): CountrySelectorItem[] {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return countrySelectorItems
    .filter(item => match(item, lowerCaseSearchTerm))
    .map(({ id, name }) => ({
      id,
      name,
    }));
}

export const CountriesSelectorStore = signalStore(
  withState(initialState),
  withComputed(({ searchTerm }) => ({
    searchResults: computed(() => search(searchTerm())),
  })),
  withMethods(store => ({
    setSearchTerm(searchTerm: string): void {
      patchState(store, () => ({ searchTerm }));
    },
  })),
);
