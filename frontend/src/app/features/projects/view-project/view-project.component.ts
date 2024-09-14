import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '@core/services/project/project.service';
import {
  ResponseGetProject,
  ResponseGetTasks,
} from '@core/services/project/project.service.types';
import { TaskService } from '@core/services/task/task.service';
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
  taskService = inject(TaskService);
  projectId = input.required<string>();
  PrimeIcons = PrimeIcons;

  getProject$!: Observable<ResponseGetProject>;
  getTasks$!: Observable<ResponseGetTasks>;

  ngOnInit() {
    this.getProject$ = this.projectService.getProject(this.projectId());
    this.getTasks$ = this.projectService.getTasksForProject(this.projectId());
  }
}
