import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '@core/services/project/project.service';
import {
  PayloadCreateProjectForUser,
  PayloadEditProjectForUser,
} from '@core/services/project/project.service.types';
import { UserService } from '@core/services/user/user.service';

import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppFieldCalendarComponent } from '@shared/app-field-calendar/app-field-calendar.component';
import { AppFieldInputComponent } from '@shared/app-field-input/app-field-input.component';
import { AppFieldTextareaComponent } from '@shared/app-field-textarea/app-field-textarea.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { CreateEditProjectForm } from './create-edit-project.model';

@Component({
  selector: 'app-create-edit-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppHeaderComponent,
    AppFooterComponent,
    AppButtonComponent,
    AppFieldInputComponent,
    AppFieldTextareaComponent,
    AppFieldCalendarComponent,
  ],
  templateUrl: './create-edit-project.component.html',
  styleUrl: './create-edit-project.component.scss',
})
export class CreateEditProjectComponent implements OnInit {
  userService = inject(UserService);
  projectService = inject(ProjectService);
  router = inject(Router);
  fb = inject(FormBuilder);
  projectId = input<string>('');
  PrimeIcons = PrimeIcons;
  currentDate = new Date();

  createEditProjectForm!: FormGroup<CreateEditProjectForm>;

  ngOnInit() {
    this.initProjectForm();
    if (this.projectId()) this.getProject();
  }

  initProjectForm() {
    this.createEditProjectForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      starts_at: [new Date(), Validators.required],
      ends_at: [
        new Date(new Date().setDate(new Date().getDate() + 1)),
        Validators.required,
      ],
    });
  }

  getProject() {
    this.projectService.getProject(this.projectId()).subscribe({
      next: (data) => {
        const project = data.project;
        this.createEditProjectForm.patchValue({
          ...project,
          starts_at: new Date(project.starts_at),
          ends_at: new Date(project.ends_at),
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    console.log(
      { invalid: this.createEditProjectForm.invalid },
      this.createEditProjectForm.value
    );
    if (this.createEditProjectForm.invalid) return;

    const userId = this.userService.user()?.id;
    if (!userId) return;

    const data = this.createEditProjectForm.getRawValue();
    const startsAt = data.starts_at?.toISOString();
    const endsAt = data.ends_at?.toISOString();
    const payload = {
      ...data,
      starts_at: startsAt,
      ends_at: endsAt,
    };

    const projectId = this.projectId();
    if (projectId) {
      this.editProject(projectId, payload);
    } else {
      this.createProject(userId, payload);
    }
  }

  createProject(userId: string, payload: PayloadCreateProjectForUser) {
    this.projectService.createProjectForUser(userId, payload).subscribe({
      next: (data) => {
        console.log('Project created:', data);
        this.router.navigate(['/projects/edit', data.project.id]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editProject(projectId: string, payload: PayloadEditProjectForUser) {
    this.projectService.editProjectForUser(projectId, payload).subscribe({
      next: (data) => {
        console.log('Project edited:', data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  returnToProject() {
    this.router.navigate(['projects', this.projectId()]);
  }
}
