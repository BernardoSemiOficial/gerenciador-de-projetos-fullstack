import { Component, effect, Input, input, WritableSignal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './app-dialog.component.html',
  styleUrl: './app-dialog.component.scss',
})
export class AppDialogComponent {
  @Input({ required: true }) title: string = '';
  @Input() visibleSignal!: WritableSignal<boolean>;
  maxWidth = input<string>();
  minHeight = input<string>();
  visible = false;

  constructor() {
    effect(() => {
      this.visible = this.visibleSignal();
    });
  }

  closeDialog() {
    this.visibleSignal.set(false);
  }
}
