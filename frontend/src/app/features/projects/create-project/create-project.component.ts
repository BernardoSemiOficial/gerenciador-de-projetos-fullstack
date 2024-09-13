import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppFieldCalendarComponent } from '@shared/app-field-calendar/app-field-calendar.component';
import { AppFieldInputComponent } from '@shared/app-field-input/app-field-input.component';
import { AppFieldTextareaComponent } from '@shared/app-field-textarea/app-field-textarea.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';
import { CreateProjectForm } from './create-project.model';

@Component({
  selector: 'app-create-project',
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
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  fb = inject(FormBuilder);
  PrimeIcons = PrimeIcons;

  createProjectForm!: FormGroup<CreateProjectForm>;

  ngOnInit() {
    this.initProjectForm();
  }

  initProjectForm() {
    this.createProjectForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      starts_at: [new Date(), Validators.required],
      ends_at: [
        new Date(new Date().setDate(new Date().getDate() + 1)),
        Validators.required,
      ],
    });
  }

  onSubmit() {
    console.log(
      { invalid: this.createProjectForm.invalid },
      this.createProjectForm.value
    );
    if (this.createProjectForm.invalid) return;

    const userId = this.userService.user()?.id;
    if (!userId) return;

    const data = this.createProjectForm.getRawValue();
    const startsAt = data.starts_at?.toISOString();
    const endsAt = data.ends_at?.toISOString();
    const payload = {
      ...data,
      starts_at: startsAt,
      ends_at: endsAt,
    };

    this.userService.createProjectForUser(userId, payload).subscribe({
      next: (data) => {
        console.log('Project created:', data);
        this.createProjectForm.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
