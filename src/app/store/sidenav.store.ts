import { Injectable, effect, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type SidenavState = {
  opened: boolean;
};

const initialState: SidenavState = {
  opened: false,
};

export const SidenavStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggle(): void {
      patchState(store, (state) => ({ opened: !state.opened }));
    },
    set(opened: boolean): void {
      patchState(store, (state) => ({ opened }));
    },
  })),
  withHooks({
    onInit: (store, authService = inject(AuthService)) => {
      authService.authState$.pipe(takeUntilDestroyed()).subscribe({
        next: () => {
          patchState(store, () => ({ opened: false }));
        },
      });
    },
  })
);
