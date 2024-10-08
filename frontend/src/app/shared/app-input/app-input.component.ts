/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, forwardRef, Input, input } from '@angular/core';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [InputTextModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AppInputComponent),
			multi: true
		}
	],
	templateUrl: './app-input.component.html',
	styleUrl: './app-input.component.scss'
})
export class AppInputComponent implements ControlValueAccessor {
	@Input({ required: true }) id = '';
	inputType = input<HTMLInputElement['type']>('text');
	placeholder = input<HTMLInputElement['placeholder']>();
	inputValue: string | number = '';
	isDisabled = false;

	_onChange = (_: unknown) => {};
	_onTouched = () => {};

	writeValue(value: string): void {
		if (value !== this.inputValue) {
			this.inputValue = value;
		}
	}
	registerOnChange(fn: (_: unknown) => void): void {
		this._onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this._onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
