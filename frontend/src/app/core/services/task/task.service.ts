import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';

import {
	PayloadCreateTask,
	PayloadEditTask,
	ResponseCreateTask,
	ResponseDeleteTask,
	ResponseEditTask,
	ResponseGetTask
} from './task.service.types';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private http: HttpClient = inject(HttpClient);
	private readonly baseUrl = environment.apiUrl;

	getTask(taskId: string) {
		return this.http.get<ResponseGetTask>(this.baseUrl + `/tasks/${taskId}`);
	}

	createTask(projectId: string, payload: PayloadCreateTask) {
		return this.http.post<ResponseCreateTask>(
			this.baseUrl + `/tasks/${projectId}`,
			payload
		);
	}

	editTask(taskId: string, payload: PayloadEditTask) {
		return this.http.put<ResponseEditTask>(
			this.baseUrl + `/tasks/${taskId}`,
			payload
		);
	}

	deleteTask(taskId: string) {
		return this.http.delete<ResponseDeleteTask>(
			this.baseUrl + `/tasks/${taskId}`
		);
	}
}
