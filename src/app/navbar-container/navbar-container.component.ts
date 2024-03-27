import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { SidenavStore } from '../store/sidenav.store';

@Component({
  selector: 'app-navbar-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent],
  templateUrl: './navbar-container.component.html',
})
export class NavbarContainerComponent {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly sidenavStore = inject(SidenavStore);

  readonly userName = this.authStore.displayName;
  readonly photoUrl = this.authStore.photoUrl;
  readonly isLoggedIn = this.authStore.isLoggedIn;

  async onSignOut() {
    await this.authStore.signOut();
    await this.router.navigate(['login']);
  }

  onToggleSidenav(): void {
    this.sidenavStore.toggle();
  }
}
