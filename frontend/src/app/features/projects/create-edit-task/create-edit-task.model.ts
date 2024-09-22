import { FormControl } from '@angular/forms';
import {
  TaskPriority,
  TaskPriorityId,
  TaskStatus,
  TaskStatusId,
} from '@core/enums/status.enum';

export interface CreateEditTaskForm {
  name: FormControl<string>;
  description: FormControl<string>;
  delivery_time: FormControl<number>;
  status: FormControl<{ id: TaskStatusId; name: TaskStatus }>;
  priority: FormControl<{ id: TaskPriorityId; name: TaskPriority }>;
}
