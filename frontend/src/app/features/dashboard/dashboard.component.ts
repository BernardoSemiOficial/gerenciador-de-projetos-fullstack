import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { ResponseGetProjectsForUser } from '@core/services/user/user.service.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private userService: UserService = inject(UserService);
  user = this.userService.user();
  userProjects$!: Observable<ResponseGetProjectsForUser>;

  constructor() {
    effect(() => {
      if (this.user) {
        this.userProjects$ = this.userService.getProjectsForUser(this.user?.id);
      }
    });
  }
}
