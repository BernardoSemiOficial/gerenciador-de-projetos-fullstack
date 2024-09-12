import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFieldInputComponent),
      multi: true,
    },
  ],
  templateUrl: './app-field-input.component.html',
  styleUrl: './app-field-input.component.scss',
})
export class AppFieldInputComponent implements ControlValueAccessor {
  fieldId = input.required<string>();
  fieldLabel = input.required<string>();
  fieldInputHelp = input.required<string>();
  fieldInputType = input<HTMLInputElement['type']>('text');
  fieldInputValue: string | number = '';
  isDisabled: boolean = false;

  _onChange = (_: any) => {};
  _onTouched = () => {};

  writeValue(value: any): void {
    if (value !== this.fieldInputValue) {
      this.fieldInputValue = value;
    }
  }
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
