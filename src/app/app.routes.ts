import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CountriesComponent } from './countries/countries.component';
import { loggedInGuard } from './guards/loggedInGuard';
import { loggedOutGuard } from './guards/loggedOutGuard';

export const routes: Routes = [
  { path: '', component: CountriesComponent, canActivate: [loggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loggedOutGuard] },
  { path: '**', redirectTo: '/' }, // Wildcard route for a 404 page
];
