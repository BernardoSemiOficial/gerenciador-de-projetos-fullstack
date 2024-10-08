import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SessionStorage } from '@core/enums/session-storage.enum';
import { User } from '@core/interfaces/user.interface';
import { environment } from '@environment/environment';
import {
	ResponseGetInvitationForUser,
	ResponseGetProjectsForUser,
	ResponseGetUser
} from './user.service.types';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private http: HttpClient = inject(HttpClient);
	private readonly baseUrl = environment.apiUrl;

	user = signal<User | null>(null);

	constructor() {
		this.getUserSessionStorage();
	}

	saveUser(user: User) {
		this.user.set(user);
		this.saveUserSessionStorage(user);
	}

	saveUserSessionStorage(user: User) {
		if (user) {
			sessionStorage.setItem(SessionStorage.User, JSON.stringify(user));
		}
	}

	getUserSessionStorage() {
		const user = sessionStorage.getItem(SessionStorage.User);
		console.log('user', user);
		if (user) {
			this.user.set(JSON.parse(user));
		}
	}

	getUser(userId: string) {
		return this.http.get<ResponseGetUser>(this.baseUrl + `/users/${userId}`);
	}

	getProjectsForUser(userId: string) {
		return this.http.get<ResponseGetProjectsForUser>(
			this.baseUrl + `/users/${userId}/projects`
		);
	}

	getInvitationForUser(inviteId: string) {
		return this.http.get<ResponseGetInvitationForUser>(
			this.baseUrl + `/invitations/${inviteId}`
		);
	}
}
