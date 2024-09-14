import { Component, Input } from '@angular/core';
import { CreateEditTaskComponent } from '@features/projects/create-edit-task/create-edit-task.component';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [CreateEditTaskComponent],
  templateUrl: './edit-task-page.component.html',
  styleUrl: './edit-task-page.component.scss',
})
export class EditTaskPageComponent {
  @Input() projectId: string = '';
  @Input() taskId: string = '';
}
