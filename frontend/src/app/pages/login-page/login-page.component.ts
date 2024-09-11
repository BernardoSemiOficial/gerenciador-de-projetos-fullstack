import { Component } from '@angular/core';
import { LoginComponent } from '@features/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
