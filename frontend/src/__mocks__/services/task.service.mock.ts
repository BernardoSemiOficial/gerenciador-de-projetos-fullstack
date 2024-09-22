import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TaskServiceMock {
	getTask() {
		return of({});
	}
	createTask() {
		return of({});
	}
	editTask() {
		return of({});
	}
	deleteTask() {
		return of({});
	}
}
