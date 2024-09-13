import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppFieldInputComponent } from '@shared/app-field-input/app-field-input.component';
import { AppFieldTextareaComponent } from '@shared/app-field-textarea/app-field-textarea.component';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';
import { PrimeIcons } from 'primeng/api';

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
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnInit {
  fb = inject(FormBuilder);
  PrimeIcons = PrimeIcons;

  createProjectForm!: FormGroup;

  ngOnInit() {
    this.initProjectForm();
  }

  initProjectForm() {
    this.createProjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      starts_at: ['', Validators.required],
      ends_at: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.createProjectForm.value);
  }
}
