import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { FleetPageComponent } from './components/pages/fleet-page/fleet-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthCallbackComponent } from './components/auth/auth-callback/auth-callback.component';
import { CarPageComponent } from './components/pages/car-page/car-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'fleet', component: FleetPageComponent },
  { path: 'callback', component: AuthCallbackComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'car/:id', component: CarPageComponent },
];
