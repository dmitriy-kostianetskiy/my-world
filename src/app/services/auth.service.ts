import { Injectable, computed, inject } from '@angular/core';
import {
  Auth,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut,
  authState,
  reauthenticateWithPopup,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);

  readonly user$ = user(this.auth);
  readonly authState$ = authState(this.auth);
  readonly isLoggedIn$ = this.user$.pipe(map(Boolean));

  readonly user = toSignal(this.user$, { initialValue: null });

  readonly uid = computed(() => this.user()?.uid);
  readonly photoUrl = computed(() => this.user()?.photoURL);
  readonly displayName = computed(() => this.user()?.displayName);
  readonly isLoggedIn = toSignal(this.isLoggedIn$);

  signIn(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
