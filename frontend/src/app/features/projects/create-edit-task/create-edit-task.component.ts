import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TaskPriority,
  TaskPriorityId,
  TaskStatus,
  TaskStatusId,
} from '@core/enums/status.enum';
import { TaskService } from '@core/services/task/task.service';
import {
  PayloadCreateTask,
  PayloadEditTask,
} from '@core/services/task/task.service.types';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppFieldInputComponent } from '@shared/app-field-input/app-field-input.component';
import { AppFieldTextareaComponent } from '@shared/app-field-textarea/app-field-textarea.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { CreateEditTaskForm } from './create-edit-task.model';

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppHeaderComponent,
    AppFooterComponent,
    AppButtonComponent,
    AppFieldInputComponent,
    AppFieldTextareaComponent,
  ],
  templateUrl: './create-edit-task.component.html',
  styleUrl: './create-edit-task.component.scss',
})
export class CreateEditTaskComponent {
  taskService = inject(TaskService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  projectId = input<string>('');
  taskId = input<string>('');
  PrimeIcons = PrimeIcons;
  currentDate = new Date();

  createEditTaskForm!: FormGroup<CreateEditTaskForm>;

  ngOnInit() {
    this.initProjectForm();
    if (this.projectId()) this.getTask();
  }

  initProjectForm() {
    this.createEditTaskForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      priority: [
        { id: TaskPriorityId.LOW, name: TaskPriority.LOW },
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      status: [
        { id: TaskStatusId.IN_PROGRESS, name: TaskStatus.IN_PROGRESS },
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      delivery_time: [1, [Validators.required, Validators.min(1)]],
    });
  }

  getTask() {
    this.taskService.getTask(this.projectId()).subscribe({
      next: (data) => {
        const task = data.task;
        this.createEditTaskForm.patchValue({
          ...task,
          priority: task.priority,
          status: task.status,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    console.log(
      { invalid: this.createEditTaskForm.invalid },
      this.createEditTaskForm.value
    );
    if (this.createEditTaskForm.invalid) return;

    const projectId = this.projectId();
    if (!projectId) return;

    const data = this.createEditTaskForm.getRawValue();
    const payload = {
      ...data,
      priority: data.priority.name,
      status: data.status.name,
    };

    const taskId = this.taskId();
    if (taskId) {
      this.editTask(taskId, payload);
    } else {
      this.createTask(projectId, payload);
    }
  }

  createTask(projectId: string, payload: PayloadCreateTask) {
    this.taskService.createTask(projectId, payload).subscribe({
      next: (data) => {
        console.log('Task created:', data);
        this.router.navigate(['../edit', data.task.id], {
          relativeTo: this.activatedRoute,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editTask(taskId: string, payload: PayloadEditTask) {
    this.taskService.editTask(taskId, payload).subscribe({
      next: (data) => {
        console.log('Task edited:', data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
