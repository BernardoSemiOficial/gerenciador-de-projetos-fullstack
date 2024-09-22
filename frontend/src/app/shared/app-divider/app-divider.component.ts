import { Component, input } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
	selector: 'app-divider',
	standalone: true,
	imports: [DividerModule],
	templateUrl: './app-divider.component.html',
	styleUrl: './app-divider.component.scss'
})
export class AppDividerComponent {
	layout = input<'vertical' | 'horizontal'>('horizontal');
	type = input<'solid' | 'dotted' | 'dashed'>('solid');
	alignContent = input<'left' | 'center' | 'right' | 'top' | 'bottom'>();
	content = input<string>();
}
