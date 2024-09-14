import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoginPayload,
  LoginResponse,
} from '@core/interfaces/authentication.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  loginForm = this.initForm();

  initForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) return;

    const registerFormValue = this.loginForm.getRawValue();
    const payload: LoginPayload = {
      email: registerFormValue.email!,
      password: registerFormValue.password!,
    };
    this.authService.login(payload).subscribe({
      next: (data: LoginResponse) => {
        this.authService.setTokens(data);
        this.userService.saveUser(data.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User logged in',
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid credentials',
        });
      },
    });
  }
}
