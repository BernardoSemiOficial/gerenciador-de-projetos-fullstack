import { Routes } from '@angular/router';
import { canActivateAuth, canActivateChildAuth } from '@core/guards/auth.guard';

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
    canActivateChild: [canActivateChildAuth],
    loadChildren: () =>
      import('./pages/projects-page/projects-page-router').then(
        (r) => r.PROJECTS_PAGE_ROUTER
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
