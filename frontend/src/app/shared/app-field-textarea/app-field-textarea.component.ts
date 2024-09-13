import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
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
      multi: true,
    },
  ],
  templateUrl: './app-field-textarea.component.html',
  styleUrl: './app-field-textarea.component.scss',
})
export class AppFieldTextareaComponent implements ControlValueAccessor {
  fieldId = input.required<string>();
  fieldLabel = input.required<string>();
  fieldInputHelp = input.required<string>();
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
