import { Component, input } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [ChipModule],
  templateUrl: './app-chip.component.html',
  styleUrl: './app-chip.component.scss',
})
export class AppChipComponent {
  label = input<string>('');
  icon = input<string>('');
  image = input<string>('');
  altImage = input<string>('');
}
