import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';
import { SidenavStore } from '../store/sidenav.store';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly sidenavStore = inject(SidenavStore);

  readonly userName = this.authStore.displayName;
  readonly photoUrl = this.authStore.photoUrl;

  readonly isLoggedIn = this.authStore.isLoggedIn;

  async onSignOutClick() {
    await this.authStore.signOut();
    await this.router.navigate(['login']);
  }

  onToggleSidenavClick(): void {
    this.sidenavStore.toggle();
  }
}
