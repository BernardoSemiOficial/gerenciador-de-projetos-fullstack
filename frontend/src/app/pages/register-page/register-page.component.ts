import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from '@features/register/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterComponent, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {}
