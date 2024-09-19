import { Component, effect, input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './app-dialog.component.html',
  styleUrl: './app-dialog.component.scss',
})
export class AppDialogComponent {
  title = input.required<string>();
  isVisible = input.required<boolean>();
  maxWidth = input<string>('25rem');
  visible = false;

  constructor() {
    effect(() => {
      this.visible = this.isVisible();
    });
  }
}
