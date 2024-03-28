import { render, screen } from '@testing-library/angular';
import { NavbarContainerComponent } from './navbar-container.component';
import { signal } from '@angular/core';
import { SidenavStore } from '../store/sidenav.store';
import { AuthStore } from '../store/auth.store';

describe('NavbarContainerComponent', () => {
  test('should render component without a crash', async () => {
    await render(NavbarContainerComponent, {
      providers: [
        {
          provide: AuthStore,
          useValue: {
            displayName: signal('Joe Doe'),
            photoUrl: signal('https://example.com/example.png'),
            isLoggedIn: signal(true),
          },
        },
        {
          provide: SidenavStore,
          useValue: {
            opened: signal(false),
          },
        },
      ],
    });

    expect(screen).toBeDefined();
  });
});
