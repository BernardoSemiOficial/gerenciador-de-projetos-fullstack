import { Component } from '@angular/core';
import { CreateProjectComponent } from '@features/projects/create-project/create-project.component';

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [CreateProjectComponent],
  templateUrl: './create-project-page.component.html',
  styleUrl: './create-project-page.component.scss',
})
export class CreateProjectPageComponent {}
