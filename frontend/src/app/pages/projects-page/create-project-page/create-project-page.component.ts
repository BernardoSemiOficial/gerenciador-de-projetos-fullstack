import { Component } from '@angular/core';
import { CreateEditProjectComponent } from '@features/projects/create-edit-project/create-edit-project.component';

@Component({
	selector: 'app-create-project-page',
	standalone: true,
	imports: [CreateEditProjectComponent],
	templateUrl: './create-project-page.component.html',
	styleUrl: './create-project-page.component.scss'
})
export class CreateProjectPageComponent {}
