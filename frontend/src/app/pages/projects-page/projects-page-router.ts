import { Route } from '@angular/router';

export const PROJECTS_PAGE_ROUTER: Route[] = [
	{
		path: 'create',
		loadComponent: () =>
			import('./create-project-page/create-project-page.component').then(
				(m) => m.CreateProjectPageComponent
			)
	},
	{
		path: 'edit/:projectId',
		loadComponent: () =>
			import('./edit-project-page/edit-project-page.component').then(
				(m) => m.EditProjectPageComponent
			)
	},
	{
		path: ':projectId',
		loadComponent: () =>
			import('./view-project-page/view-project-page.component').then(
				(m) => m.ViewProjectPageComponent
			)
	},
	{
		path: ':projectId/tasks/create',
		loadComponent: () =>
			import('./create-task-page/create-task-page.component').then(
				(m) => m.CreateTaskPageComponent
			)
	},
	{
		path: ':projectId/tasks/edit/:taskId',
		loadComponent: () =>
			import('./edit-task-page/edit-task-page.component').then(
				(m) => m.EditTaskPageComponent
			)
	}
];
