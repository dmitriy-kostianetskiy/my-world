import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarContainerComponent } from './navbar-container.component';
import { AuthStore } from '../store/auth.store';
import { signal } from '@angular/core';
import { SidenavStore } from '../store/sidenav.store';

describe('NavbarContainerComponent', () => {
  let component: NavbarContainerComponent;
  let fixture: ComponentFixture<NavbarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      imports: [NavbarContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
