import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { ResponseGetProjectsForUser } from '@core/services/user/user.service.types';
import { AppCardComponent } from '@shared/app-card/app-card.component';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AppCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private userService: UserService = inject(UserService);
  user = this.userService.user();
  userProjects$!: Observable<ResponseGetProjectsForUser>;
  PrimeIcons = PrimeIcons;

  constructor() {
    effect(() => {
      if (this.user) {
        this.userProjects$ = this.userService.getProjectsForUser(this.user?.id);
      }
    });
  }
}
