import { Injectable, effect, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private readonly authService = inject(AuthService);

  readonly canOpen = this.authService.isLoggedIn;
  readonly opened = signal(false);

  constructor() {
    effect(
      () => {
        if (!this.canOpen()) {
          this.opened.set(false);
        }
      },
      { allowSignalWrites: true }
    );
  }

  toggle(): void {
    this.opened.update((value) => !value);
  }
}
