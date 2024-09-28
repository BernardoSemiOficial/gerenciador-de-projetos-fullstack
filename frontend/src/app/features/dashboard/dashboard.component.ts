import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectForUser, User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user/user.service';
import { ResponseGetProjectsForUser } from '@core/services/user/user.service.types';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppCardComponent } from '@shared/app-card/app-card.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { DashboardDialogInvitationsComponent } from './components/dashboard-dialog-invites/dashboard-dialog-invitations.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,
		ReactiveFormsModule,
		AppHeaderComponent,
		AppFooterComponent,
		AppCardComponent,
		AppButtonComponent,
		DashboardDialogInvitationsComponent
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
	private userService: UserService = inject(UserService);
	user: User | null = null;
	userProjects$!: Observable<ResponseGetProjectsForUser>;
	PrimeIcons = PrimeIcons;
	viewDialogInvites = signal<boolean>(false);
	projects: ProjectForUser[] = [];

	ngOnInit() {
		this.user = this.userService.user();
		if (this.user) {
			this.userProjects$ = this.userService
				.getProjectsForUser(this.user?.id)
				.pipe(
					map((data) => {
						this.projects = data.projects;
						return data;
					})
				);
		}
	}

	showDialogInvites() {
		this.viewDialogInvites.set(true);
	}
}
