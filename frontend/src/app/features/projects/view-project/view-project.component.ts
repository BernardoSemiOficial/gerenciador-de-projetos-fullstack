import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { ProjectService } from '@core/services/project/project.service';
import { ResponseGetProject } from '@core/services/project/project.service.types';
import { AppChipComponent } from '@shared/app-chip/app-chip.component';
import { AppDividerComponent } from '@shared/app-divider/app-divider.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
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
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss',
})
export class ViewProjectComponent implements OnInit {
  projectService = inject(ProjectService);
  projectId = input.required<string>();
  PrimeIcons = PrimeIcons;

  getProject$!: Observable<ResponseGetProject>;

  ngOnInit() {
    this.getProject$ = this.projectService.getProject(this.projectId());
  }
}
