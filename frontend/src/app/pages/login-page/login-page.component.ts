import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '@features/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
