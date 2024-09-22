import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserServiceMock {
	user = signal({});

	getInvitationForUser() {
		return of({});
	}
	getProjectsForUser() {
		return of({});
	}
}
