import { Component } from '@angular/core';
import { RegisterComponent } from '@features/register/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {}
