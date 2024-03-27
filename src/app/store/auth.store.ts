import { computed, inject } from '@angular/core';
import { Auth, user, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withComputed((_store, auth = inject(Auth)) => ({
    authState: toSignal(authState(auth)),
    user: toSignal(user(auth)),
  })),
  withComputed(store => ({
    uid: computed(() => store.user()?.uid),
    photoUrl: computed(() => store.user()?.photoURL),
    displayName: computed(() => store.user()?.displayName),
    isLoggedIn: computed(() => Boolean(store.user())),
  })),
  withMethods((store, auth = inject(Auth)) => ({
    async singInWithGoogle() {
      await signInWithPopup(auth, new GoogleAuthProvider());
    },
    async signOut() {
      await signOut(auth);
    },
  })),
);
