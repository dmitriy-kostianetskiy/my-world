import { Injectable, computed, inject } from '@angular/core';
import {
  Auth,
  authState,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, from, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);

  readonly user$ = user(this.auth);
  readonly isLoggedIn$ = this.user$.pipe(map(Boolean));

  readonly user = toSignal(this.user$);

  signIn(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
