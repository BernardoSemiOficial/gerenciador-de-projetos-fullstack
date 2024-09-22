import { DatePipe, NgClass } from '@angular/common';
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
  imports: [CardModule, ButtonModule, NgClass, DatePipe],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardComponent {
  router = inject(Router);
  title = input<string>();
  date = input<{ startsAt: Date; endsAt: Date }>();
  description = input<string>();
  icons = input<{ label: string | number; class: PrimeIcons }[]>([]);
  redirectPath = input<unknown[]>();
  PrimeIcons = PrimeIcons;

  handleClickButton() {
    const redirectPath = this.redirectPath();
    if (redirectPath) {
      this.router.navigate(redirectPath);
    }
  }
}
