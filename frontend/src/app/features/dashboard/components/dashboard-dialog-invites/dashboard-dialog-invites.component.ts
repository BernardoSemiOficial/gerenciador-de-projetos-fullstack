import { Component, inject, Input, input, WritableSignal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectForUser } from '@core/interfaces/user.interface';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppDialogComponent } from '@shared/app-dialog/app-dialog.component';
import { AppInputComponent } from '@shared/app-input/app-input.component';
import { AppMultiSelectComponent } from '@shared/app-multi-select/app-multi-select.component';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-dashboard-dialog-invites',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppDialogComponent,
    AppInputComponent,
    AppButtonComponent,
    AppMultiSelectComponent,
  ],
  templateUrl: './dashboard-dialog-invites.component.html',
  styleUrl: './dashboard-dialog-invites.component.scss',
})
export class DashboardDialogInvitesComponent {
  private fb = inject(FormBuilder);
  @Input({ required: true, alias: 'visibleSignal' })
  visibleDialogInvites!: WritableSignal<boolean>;
  projects = input.required<ProjectForUser[]>();
  invitesForm!: FormGroup;
  PrimeIcons = PrimeIcons;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.invitesForm = this.fb.group({
      invites: this.fb.array([
        this.fb.group({
          email: new FormControl('', [Validators.required, Validators.email]),
          projectsIds: new FormControl<string[]>(
            [],
            [Validators.required, Validators.minLength(1)]
          ),
        }),
      ]),
    });
  }

  get invites() {
    return this.invitesForm.get('invites') as FormArray;
  }

  addNewInviteUser() {
    this.invites.push(
      new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        projectsIds: new FormControl<string[]>(
          [],
          [Validators.required, Validators.minLength(1)]
        ),
      })
    );
  }

  removeInviteUser(idx: number) {
    this.invites.controls.splice(idx, 1);
  }

  sendInvites() {
    if (this.invitesForm.invalid) return;

    console.log(
      this.invitesForm.value,
      this.invitesForm.valid,
      this.invites.valid
    );
  }

  closeDialogInvites() {
    this.visibleDialogInvites.set(false);
  }
}
