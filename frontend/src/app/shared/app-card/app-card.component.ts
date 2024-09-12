import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardComponent {
  router = inject(Router);
  title = input<string>();
  description = input.required<string>();
  icons = input<{ label: string | number; class: PrimeIcons }[]>([]);
  redirectPath = input<[string, string | number]>();

  handleClickButton() {
    const redirectPath = this.redirectPath();
    if (redirectPath) {
      this.router.navigate(redirectPath);
    }
  }
}
