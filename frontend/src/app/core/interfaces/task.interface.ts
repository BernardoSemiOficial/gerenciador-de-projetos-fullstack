import {
  TaskPriority,
  TaskPriorityId,
  TaskStatus,
  TaskStatusId,
} from '@core/enums/status.enum';

export interface Task {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  delivery_time: number;
  status: {
    id: TaskStatusId;
    name: TaskStatus;
  };
  priority: {
    id: TaskPriorityId;
    name: TaskPriority;
  };
}
