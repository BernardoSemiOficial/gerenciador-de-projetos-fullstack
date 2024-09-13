import { Route } from '@angular/router';

export const PROJECTS_PAGE_ROUTER: Route[] = [
  {
    path: 'create',
    loadComponent: () =>
      import('./create-project-page/create-project-page.component').then(
        (m) => m.CreateProjectPageComponent
      ),
  },
  {
    path: ':projectId',
    loadComponent: () =>
      import('./view-project-page/view-project-page.component').then(
        (m) => m.ViewProjectPageComponent
      ),
  },
];
