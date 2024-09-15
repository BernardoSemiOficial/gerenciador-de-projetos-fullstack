import { TaskPriority, TaskStatus } from '@core/enums/status.enum';
import { Task } from '@core/interfaces/task.interface';

export interface ResponseGetTask {
  task: Task;
}

export interface PayloadCreateTask {
  name: string;
  description: string;
  delivery_time: number;
  priority: TaskPriority;
}

export interface ResponseCreateTask {
  task: Task;
}

export interface PayloadEditTask {
  name: string;
  description: string;
  delivery_time: number;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface ResponseEditTask {
  task: Task;
}

export interface ResponseDeleteTask {
  task: string;
}
