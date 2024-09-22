import { Component, Input } from '@angular/core';
import { CreateEditProjectComponent } from '@features/projects/create-edit-project/create-edit-project.component';

@Component({
  selector: 'app-edit-project-page',
  standalone: true,
  imports: [CreateEditProjectComponent],
  templateUrl: './edit-project-page.component.html',
  styleUrl: './edit-project-page.component.scss',
})
export class EditProjectPageComponent {
  id = '';

  @Input() set projectId(id: string) {
    this.id = id;
  }
}
