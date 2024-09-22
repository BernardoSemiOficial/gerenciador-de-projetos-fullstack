import { Component, inject, input, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
	TaskPriority,
	TaskPriorityId,
	TaskStatus,
	TaskStatusId
} from '@core/enums/status.enum';
import { DialogConfirmationService } from '@core/services/dialog-confirmation/dialog-confirmation.service';
import { TaskService } from '@core/services/task/task.service';
import {
	PayloadCreateTask,
	PayloadEditTask
} from '@core/services/task/task.service.types';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppFieldDropdownComponent } from '@shared/app-field-dropdown/app-field-dropdown.component';
import { AppFieldInputNumberComponent } from '@shared/app-field-input-number/app-field-input-number.component';
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
		AppFieldInputNumberComponent,
		AppFieldDropdownComponent
	],
	templateUrl: './create-edit-task.component.html',
	styleUrl: './create-edit-task.component.scss'
})
export class CreateEditTaskComponent implements OnInit {
	taskService = inject(TaskService);
	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);
	toastAlertService = inject(ToastAlertService);
	dialogConfirmationService = inject(DialogConfirmationService);
	fb = inject(FormBuilder);
	projectId = input<string>('');
	taskId = input<string>('');

	currentDate = new Date();
	PrimeIcons = PrimeIcons;
	taskPriorityOptions: { id: TaskPriorityId; name: TaskPriority }[] = [];
	taskStatusOptions: { id: TaskStatusId; name: TaskStatus }[] = [];

	createEditTaskForm!: FormGroup<CreateEditTaskForm>;

	ngOnInit() {
		this.initProjectForm();
		if (this.projectId()) this.getTask();
	}

	initProjectForm() {
		this.taskPriorityOptions = [
			{ id: TaskPriorityId.LOW, name: TaskPriority.LOW },
			{ id: TaskPriorityId.MEDIUM, name: TaskPriority.MEDIUM },
			{ id: TaskPriorityId.HIGH, name: TaskPriority.HIGH },
			{ id: TaskPriorityId.CRITICAL, name: TaskPriority.CRITICAL }
		];
		this.taskStatusOptions = [
			{ id: TaskStatusId.IN_PROGRESS, name: TaskStatus.IN_PROGRESS },
			{ id: TaskStatusId.PENDING, name: TaskStatus.PENDING },
			{ id: TaskStatusId.COMPLETED, name: TaskStatus.COMPLETED },
			{ id: TaskStatusId.CANCELLED, name: TaskStatus.CANCELLED }
		];
		this.createEditTaskForm = this.fb.nonNullable.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			description: ['', [Validators.required, Validators.minLength(5)]],
			priority: [
				{ id: TaskPriorityId.LOW, name: TaskPriority.LOW },
				[Validators.required, Validators.min(1), Validators.max(4)]
			],
			status: [
				{ id: TaskStatusId.IN_PROGRESS, name: TaskStatus.IN_PROGRESS },
				[Validators.required, Validators.min(1), Validators.max(4)]
			],
			delivery_time: [1, [Validators.required, Validators.min(1)]]
		});
	}

	getTask() {
		this.taskService.getTask(this.taskId()).subscribe({
			next: (data) => {
				const task = data.task;
				this.createEditTaskForm.patchValue({
					...task,
					priority: task.priority,
					status: task.status
				});
			},
			error: (error) => {
				console.error(error);
			}
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
			status: data.status.name
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
				this.router.navigate(['../edit', data.task.id], {
					relativeTo: this.activatedRoute
				});
				this.toastAlertService.addSuccessMessage({
					title: 'Success',
					description: 'task created successfully'
				});
			},
			error: ({ error }) => {
				console.error(error);
				this.toastAlertService.addDangerMessage({
					title: 'Error',
					description: error.message
				});
			}
		});
	}

	editTask(taskId: string, payload: PayloadEditTask) {
		this.taskService.editTask(taskId, payload).subscribe({
			next: () => {
				this.toastAlertService.addSuccessMessage({
					title: 'Success',
					description: 'task edited successfully'
				});
			},
			error: ({ error }) => {
				console.error(error);
				this.toastAlertService.addDangerMessage({
					title: 'Error',
					description: error.message
				});
			}
		});
	}

	deleteTask() {
		this.taskService.deleteTask(this.taskId()).subscribe({
			next: (data) => {
				this.toastAlertService.addSuccessMessage({
					title: 'Deleted task',
					description: data.task
				});
				this.returnToProject();
			},
			error: ({ error }) => {
				this.toastAlertService.addDangerMessage({
					title: 'Error deleting task',
					description: error.message
				});
			}
		});
	}

	confirmationDelete() {
		this.dialogConfirmationService.addConfirmation({
			title: 'Delete task',
			description: 'Are you sure you want to delete this task?',
			icon: 'pi pi-exclamation-triangle',
			acceptCallback: () => this.deleteTask()
		});
	}

	returnToProject() {
		this.router.navigate(['projects', this.projectId()]);
	}
}
