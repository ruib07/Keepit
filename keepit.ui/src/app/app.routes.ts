import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Mainlayout } from './layout/mainlayout/mainlayout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: Mainlayout,
    children: [
      {
        path: 'equipments',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/equipments/equipments.routes').then((m) => m.EQUIPMENT_ROUTES),
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTE),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    loadChildren: () => import('./features/notfound/notfound.route').then((m) => m.NOTFOUND_ROUTE),
  },
];
