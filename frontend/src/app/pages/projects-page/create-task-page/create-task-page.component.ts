import { Component, Input } from '@angular/core';
import { CreateEditTaskComponent } from '@features/projects/create-edit-task/create-edit-task.component';

@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [CreateEditTaskComponent],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss',
})
export class CreateTaskPageComponent {
  @Input() projectId: string = '';
}
