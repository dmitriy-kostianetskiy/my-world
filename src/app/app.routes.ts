import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
  {
    path: 'map',
    component: MapPageComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  {
    path: 'login',
    component: LoginPageComponent,
    ...canActivate(() => redirectLoggedInTo([''])),
  },
  { path: '**', redirectTo: '/' }, // Wildcard route for a 404 page
];
