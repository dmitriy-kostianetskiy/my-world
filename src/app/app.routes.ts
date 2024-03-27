import { Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
  {
    path: 'map',
    loadComponent: () => import('./map-page/map-page.component').then(m => m.MapPageComponent),
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent),
    ...canActivate(() => redirectLoggedInTo([''])),
  },
  { path: '**', redirectTo: '/' }, // Wildcard route for a 404 page
];
