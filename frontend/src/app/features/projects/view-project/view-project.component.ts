import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DialogConfirmationService } from '@core/services/dialog-confirmation/dialog-confirmation.service';
import { ProjectService } from '@core/services/project/project.service';
import {
  ResponseGetProject,
  ResponseGetTasks,
} from '@core/services/project/project.service.types';
import { TaskService } from '@core/services/task/task.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { AppChipComponent } from '@shared/app-chip/app-chip.component';
import { AppDividerComponent } from '@shared/app-divider/app-divider.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppButtonComponent } from '../../../shared/app-button/app-button.component';
import { AppCardComponent } from '../../../shared/app-card/app-card.component';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [
    AppHeaderComponent,
    AppFooterComponent,
    AppCardComponent,
    AppChipComponent,
    AppDividerComponent,
    AppButtonComponent,
    RouterLink,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss',
})
export class ViewProjectComponent implements OnInit {
  projectService = inject(ProjectService);
  toastAlertService = inject(ToastAlertService);
  dialogConfirmationService = inject(DialogConfirmationService);
  router = inject(Router);
  taskService = inject(TaskService);
  @Input({ required: true }) projectId = '';
  PrimeIcons = PrimeIcons;

  getProject$!: Observable<ResponseGetProject>;
  getTasks$!: Observable<ResponseGetTasks>;

  ngOnInit() {
    this.getProject$ = this.projectService.getProject(this.projectId);
    this.getTasks$ = this.projectService.getTasksForProject(this.projectId);
  }

  confirmationDelete() {
    this.dialogConfirmationService.addConfirmation({
      title: 'Delete project',
      description: 'Are you sure you want to delete this project?',
      icon: 'pi pi-exclamation-triangle',
      acceptCallback: () => this.deleteProject(),
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectId).subscribe({
      next: (data) => {
        this.toastAlertService.addSuccessMessage({
          title: 'Deleted project',
          description: data.project,
        });
        this.router.navigate(['/dashboard']);
      },
      error: ({ error }) => {
        this.toastAlertService.addDangerMessage({
          title: 'Error deleting project',
          description: error.message,
        });
      },
    });
  }
}
