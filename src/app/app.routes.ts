import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { FleetPageComponent } from './components/pages/fleet-page/fleet-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'fleet', component: FleetPageComponent },
];
