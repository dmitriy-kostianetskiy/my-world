import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  @Input() isLoggedIn?: boolean | null;
  @Input() photoUrl?: string | null;
  @Input() userName?: string | null;

  @Output() toggleSidenav = new EventEmitter();
  @Output() signOut = new EventEmitter();

  onToggleSidenavClick(): void {
    this.toggleSidenav.emit();
  }

  onSignOutClick(): void {
    this.signOut.emit();
  }
}
