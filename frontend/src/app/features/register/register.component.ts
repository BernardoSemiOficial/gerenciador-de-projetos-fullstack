import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPayload } from '@core/interfaces/authentication.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private toastAlertService: ToastAlertService = inject(ToastAlertService);
  private router: Router = inject(Router);
  registerForm = this.initForm();

  initForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  registerUser() {
    if (this.registerForm.invalid) return;

    const registerFormValue = this.registerForm.getRawValue();
    const payload: RegisterPayload = {
      name: registerFormValue.name!,
      email: registerFormValue.email!,
      password: registerFormValue.password!,
    };
    this.authService.register(payload).subscribe({
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
