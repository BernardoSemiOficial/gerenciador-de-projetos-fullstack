import { Component, inject, Input, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectForUser } from '@core/interfaces/user.interface';
import { InvitationService } from '@core/services/invitation/invitation.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppDialogComponent } from '@shared/app-dialog/app-dialog.component';
import { AppInputComponent } from '@shared/app-input/app-input.component';
import { AppMultiSelectComponent } from '@shared/app-multi-select/app-multi-select.component';
import { PrimeIcons } from 'primeng/api';
import {
  InvitationFormArray,
  SendInvitationsForm,
} from './dashboard-dialog-invitations.model';

@Component({
  selector: 'app-dashboard-dialog-invitations',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppDialogComponent,
    AppInputComponent,
    AppButtonComponent,
    AppMultiSelectComponent,
  ],
  templateUrl: './dashboard-dialog-invitations.component.html',
  styleUrl: './dashboard-dialog-invitations.component.scss',
})
export class DashboardDialogInvitationsComponent {
  private fb = inject(FormBuilder);
  invitationsService = inject(InvitationService);
  toastAlertService = inject(ToastAlertService);

  @Input({ required: true, alias: 'visibleSignal' })
  visibleDialogInvites!: WritableSignal<boolean>;
  @Input({ required: true }) projects: ProjectForUser[] = [];

  sendInvitesForm!: FormGroup<SendInvitationsForm>;
  PrimeIcons = PrimeIcons;
  isLoadingInvites = false;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.sendInvitesForm = this.fb.nonNullable.group({
      invitations: this.fb.nonNullable.array([
        this.fb.nonNullable.group({
          email: ['', [Validators.required, Validators.email]],
          projectsId: [
            [] as string[],
            [Validators.required, Validators.minLength(1)],
          ],
        }),
      ]),
    });
  }

  get invitations() {
    return this.sendInvitesForm.get('invitations') as InvitationFormArray;
  }

  addNewInviteUser() {
    this.invitations.push(
      this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        projectsId: [
          [] as string[],
          [Validators.required, Validators.minLength(1)],
        ],
      })
    );
  }

  removeInviteUser(idx: number) {
    this.invitations.removeAt(idx);
  }

  sendInvites() {
    if (this.sendInvitesForm.invalid) return;
    this.isLoadingInvites = true;

    const invitations = this.invitations.getRawValue();

    this.invitationsService
      .postInvitations(invitations)
      .subscribe({
        next: () => {
          this.closeDialogInvites();
          this.toastAlertService.addSuccessMessage({
            title: 'Success',
            description: 'Invites sent successfully',
          });
        },
        error: (err) => {
          console.error(err);
          this.toastAlertService.addDangerMessage({
            title: 'Error',
            description: 'Error sending invitations',
          });
        },
      })
      .add(() => (this.isLoadingInvites = false));
  }

  closeDialogInvites() {
    this.visibleDialogInvites.set(false);
  }
}
