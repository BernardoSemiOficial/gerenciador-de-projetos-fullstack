/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
	Component,
	forwardRef,
	Input,
	input,
	InputSignal
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
	NgModel
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
	selector: 'app-field-input-number',
	standalone: true,
	imports: [CommonModule, InputNumberModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AppFieldInputNumberComponent),
			multi: true
		}
	],
	templateUrl: './app-field-input-number.component.html',
	styleUrl: './app-field-input-number.component.scss'
})
export class AppFieldInputNumberComponent implements ControlValueAccessor {
	formControlField:
		| InputSignal<NgModel>
		| InputSignal<AbstractControl>
		| InputSignal<null> = input(null);
	@Input({ required: true }) fieldId = '';
	@Input({ required: true }) fieldLabel = '';
	@Input({ required: true }) fieldInputHelp = '';

	step = input<number>(1);
	mode = input<'decimal' | 'currency'>('decimal');
	max = input<number>();
	min = input<number>();
	maxlength = input<string | number | null>(null);
	buttonLayout = input<'stacked' | 'horizontal' | 'vertical'>('stacked');
	isShowButtons = input<boolean>(false);
	isRequired = input<boolean>(false);
	isReadonly = input<boolean>(false);
	decrementButtonClass = input<string>();
	incrementButtonClass = input<string>();
	incrementButtonIcon = input<string>();
	decrementButtonIcon = input<string>();

	fieldInputValue: string | number = '';
	isDisabled = false;

	analyticsFormControl() {
		const formControl = this.formControlField();
		const errors = formControl?.errors;
		const errorsKey = Object.keys(errors ?? {});

		return {
			errorsLength: errorsKey.length,
			errorKey: errorsKey[0],
			status: formControl?.status?.toLowerCase() ?? ''
		};
	}

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
