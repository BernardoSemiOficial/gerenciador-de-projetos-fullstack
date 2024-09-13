import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { ProjectService } from '@core/services/project/project.service';
import { ResponseGetProject } from '@core/services/project/project.service.types';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, AsyncPipe, JsonPipe],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss',
})
export class ViewProjectComponent implements OnInit {
  projectService = inject(ProjectService);
  projectId = input.required<string>();

  project$!: Observable<ResponseGetProject>;

  ngOnInit() {
    this.project$ = this.projectService.getProject(this.projectId());
  }
}
