import { Routes } from '@angular/router';
import { canActivateAuth } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [canActivateAuth],
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
  },
  {
    path: 'projects',
    canActivate: [canActivateAuth],
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import(
            './pages/create-project-page/create-project-page.component'
          ).then((m) => m.CreateProjectPageComponent),
      },
      {
        path: ':projectId',
        loadComponent: () =>
          import('./pages/view-project-page/view-project-page.component').then(
            (m) => m.ViewProjectPageComponent
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
