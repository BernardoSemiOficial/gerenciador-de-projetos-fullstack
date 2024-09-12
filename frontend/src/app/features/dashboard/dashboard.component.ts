import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { ResponseGetProjectsForUser } from '@core/services/user/user.service.types';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppCardComponent } from '@shared/app-card/app-card.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppHeaderComponent,
    AppFooterComponent,
    AppCardComponent,
    AppButtonComponent,
  ],
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
