import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class NavbarComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly sidenavService = inject(SidenavService);

  readonly userName = computed(() => this.authService.user()?.displayName);

  readonly canOpenSidenav = this.sidenavService.canOpen;

  onSignOutClick(): void {
    this.authService
      .signOut()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.router.navigate(['login']))
      )
      .subscribe();
  }

  onToggleSidenavClick(): void {
    this.sidenavService.toggle();
  }
}
