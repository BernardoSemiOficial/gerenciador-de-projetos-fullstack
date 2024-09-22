/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, forwardRef, Input } from '@angular/core';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
	selector: 'app-field-textarea',
	standalone: true,
	imports: [InputTextareaModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AppFieldTextareaComponent),
			multi: true
		}
	],
	templateUrl: './app-field-textarea.component.html',
	styleUrl: './app-field-textarea.component.scss'
})
export class AppFieldTextareaComponent implements ControlValueAccessor {
	@Input() fieldId = '';
	@Input() fieldLabel = '';
	@Input() fieldInputHelp = '';
	fieldInputValue: string | number = '';
	isDisabled = false;

	_onChange = (_: unknown) => {};
	_onTouched = () => {};

	writeValue(value: string): void {
		if (value !== this.fieldInputValue) {
			this.fieldInputValue = value;
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
