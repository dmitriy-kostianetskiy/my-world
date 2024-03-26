import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CountriesComponent } from './countries/countries.component';
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
    component: CountriesComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo([''])),
  },
  { path: '**', redirectTo: '/' }, // Wildcard route for a 404 page
];
