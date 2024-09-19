import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AppFieldInputComponent } from '@shared/app-field-input/app-field-input.component';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [InputMaskModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFieldInputComponent),
      multi: true,
    },
  ],
  templateUrl: './app-input-mask.component.html',
  styleUrl: './app-input-mask.component.scss',
})
export class AppInputMaskComponent implements ControlValueAccessor {
  mask = input.required<string>();
  placeholder = input.required<string>();
  inputValue: string | number = '';
  isDisabled: boolean = false;

  _onChange = (_: any) => {};
  _onTouched = () => {};

  writeValue(value: any): void {
    if (value !== this.inputValue) {
      this.inputValue = value;
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
