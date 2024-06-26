import { effect, inject } from '@angular/core';
import { AuthStore } from './auth.store';

import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

type SidenavState = {
  opened: boolean;
};

const initialState: SidenavState = {
  opened: false,
};

export const SidenavStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => ({
    toggle(): void {
      patchState(store, state => ({ opened: !state.opened }));
    },
    set(opened: boolean): void {
      patchState(store, () => ({ opened }));
    },
  })),
  withHooks({
    onInit: (store, authStore = inject(AuthStore)) => {
      effect(
        () => {
          authStore.authState();

          patchState(store, () => ({ opened: false }));
        },
        { allowSignalWrites: true },
      );
    },
  }),
);
