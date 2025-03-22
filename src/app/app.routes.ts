import { Routes } from '@angular/router';
import { NotfoundComponent } from './modules/error/notfound/notfound.component';



export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/pages/home.routes').then(m => m.HOME_ROUTES) },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
