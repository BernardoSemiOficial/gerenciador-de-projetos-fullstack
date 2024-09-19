import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectForUser } from '@core/interfaces/user.interface';
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
    RouterModule,
    ReactiveFormsModule,
    AppHeaderComponent,
    AppFooterComponent,
    AppCardComponent,
    AppButtonComponent,
    DashboardDialogInvitationsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private userService: UserService = inject(UserService);
  user = this.userService.user();
  userProjects$!: Observable<ResponseGetProjectsForUser>;
  PrimeIcons = PrimeIcons;
  viewDialogInvites = signal<boolean>(true);
  projects: ProjectForUser[] = [];

  constructor() {
    effect(() => {
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
    });
  }

  showDialogInvites() {
    this.viewDialogInvites.set(true);
  }
}
