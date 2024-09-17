import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InvitePayload } from '@core/interfaces/authentication.interface';
import { InviteForUser } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
})
export class InviteComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private toastAlertService: ToastAlertService = inject(ToastAlertService);
  private router: Router = inject(Router);
  inviteForm!: FormGroup;
  inviteId = input.required<string>();
  inviteDetails!: InviteForUser;

  ngOnInit() {
    this.initForm();
    this.getInvite();
  }

  initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getInvite() {
    this.userService.getInvitationForUser(this.inviteId()).subscribe({
      next: (data) => {
        this.inviteDetails = data.invite;
        this.inviteForm.patchValue({
          email: data.invite.email,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastAlertService.addDangerMessage({
          title: 'Error',
          description: 'Failed to get invitation',
        });
      },
    });
  }

  confirmInviteUser() {
    if (this.inviteForm.invalid) return;

    const registerFormValue = this.inviteForm.getRawValue();
    const payload: InvitePayload = {
      name: registerFormValue.name!,
      email: registerFormValue.email!,
      password: registerFormValue.password!,
    };
    this.authService.invite(this.inviteId(), payload).subscribe({
      next: (data) => {
        this.authService.setTokens(data);
        this.userService.saveUser(data.user);
        this.toastAlertService.addSuccessMessage({
          title: 'Success',
          description: 'User registered',
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastAlertService.addDangerMessage({
          title: 'Error',
          description: 'User registration failed',
        });
      },
    });
  }
}
