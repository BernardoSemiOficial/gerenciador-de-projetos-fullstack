import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

type ButtonSize = 'small' | 'large';
type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';
type ButtonSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'help'
  | 'primary'
  | 'secondary'
  | 'contrast';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class AppButtonComponent {
  label = input<string>();
  type = input<HTMLButtonElement['type']>('button');
  icon = input<string>();
  isRounded = input<boolean>();
  iconPos = input<ButtonIconPosition>('left');
  severity = input<ButtonSeverity>();
  size = input<ButtonSize>();
  isLoading = input<boolean>(false);
  isDisabled = input<boolean>(false);
  isRaised = input<boolean>(false);
  isText = input<boolean>(false);
  isOutlined = input<boolean>(false);

  onClicked = output();
}
